<script setup>
import { ref, onMounted, watch } from "vue";
import { useDataformsStore } from "@/stores/dataFormsStore";
import { useSlotsPrepare } from "@/composables/useSlotsPrepare.js";
import { defineRule, useForm } from "vee-validate";
import { all } from "@vee-validate/rules";

Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule);
});

const dataformsStore = useDataformsStore();
const { getApiSlots } = useSlotsPrepare();

const {
  getCurrentForm,
  addForm,
  removeForm,
  addField,
  updateBinder,
  makeFormValid,
  makeFormInvalid,
  setFormErrors,
} = dataformsStore;

const emit = defineEmits([
  "dataFormSubmit",
  "dataFormSubmitSuccess",
  "dataFormSubmitFailed",
  "dataFormSubmitWithErrors",
]);

const vFormRef = ref(null);
const loading = ref(false);
const submitEvent = new Event("dataFormSubmit");
const submitSuccessEvent = new Event("dataFormSubmitSuccess");
const submitFailedEvent = new Event("dataFormSubmitFailed");
const initBinder = ref(false);
const initBinderValues = ref({});
const submitOK = ref(false);

const props = defineProps({
  id: {
    required: true,
    type: String,
  },
  api: {
    type: Object,
    default: () => ({}),
  },
  locale: {
    type: String,
    default: "en",
  },
  localeStrings: {
    type: Object,
    default: () => ({}),
  },
  options: {
    type: Object,
    default: () => ({ leaveAlertWhenDataChanges: true }),
  },
});

const leaveAlertWhenDataChanges = (data) => {
  if (!("binder" in data) || !props.options.leaveAlertWhenDataChanges) return;

  if (!initBinder.value) {
    initBinderValues.value = { ...data.binder } ?? {};
    initBinder.value = true;
  }

  window.onbeforeunload = null;

  if (
    JSON.stringify(initBinderValues.value) !== JSON.stringify(data.binder) &&
    !submitOK.value
  ) {
    window.onbeforeunload = function () {
      return true;
    };
  }

  updateBinder({
    formId: props.id,
    binder: data.binder,
  });
};

const submit = () => {
  submitOK.value = false;

  makeFormInvalid(props.id);

  const theForm = getCurrentForm(props.id);

  if ("beforeSubmit" in props.api.submit) {
    props.api.submit.beforeSubmit(theForm.fields);
  }

  const binder = validateBinder();

  setFormErrors({
    formId: props.id,
    errors: [],
  });

  document.dispatchEvent(submitEvent);
  emit("dataFormSubmit");

  handleSubmit(
    () => submitSuccess(binder),
    (validationErrors) => submitErrors(validationErrors.errors)
  )();
};

const addBinderDataToFields = () => {
  if (!props.api.binder) return true;

  Object.keys(props.api.binder).forEach((item) => {
    const data = props.api.binder[item];

    addField({
      formId: props.id,
      fieldName: item,
      fieldValue: data,
    });
  });
};

const validateBinder = () => {
  const binderData = {};
  let validated = true;

  if (!props.api.binder) return true;

  Object.keys(props.api.binder).forEach((item) => {
    const data = props.api.binder[item];

    if (typeof data === "object" && data !== null) {
      if (data.invalid) {
        console.error("Binder value is not valid: ", item);
        validated = false;

        return;
      }

      data.invalid = false;
    }

    binderData[item] = data;
  });

  return validated ? binderData : false;
};

const setLoading = (value) => {
  loading.value = value;
};

const changeLeaf = (leaf) => {
  document.dispatchEvent(new CustomEvent("changeLeaf", { detail: { leaf } }));
};

const scrollToError = () => {
  const vFormEL = vFormRef.value.$el;
  const el = vFormEL.querySelector(".v-input--error:first-of-type");

  if (el) {
    const yOffset = -200;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const { handleSubmit } = useForm();

const submitSuccess = async (binder) => {
  if (binder) {
    const theForm = getCurrentForm(props.id);

    makeFormValid(props.id);
    submitOK.value = true;

    if (props.api.submit) {
      try {
        await props.api.submit.click(theForm.fields);

        document.dispatchEvent(submitSuccessEvent);
        emit("dataFormSubmitSuccess");

        theForm.unsaved = false;
      } catch (error) {
        emit("dataFormSubmitWithErrors", error);
      }
    }
  } else {
    submitErrors([]);
  }
};

const submitErrors = (errors) => {
  setFormErrors({
    formId: props.id,
    errors: errors,
  });

  document.dispatchEvent(submitFailedEvent);
  emit("dataFormSubmitFailed");
  scrollToError();
};

onMounted(() => {
  addForm({
    form_id: props.id,
    locale: props.locale,
    locale_strings: props.localeStrings,
  });

  updateBinder({
    formId: props.id,
    binder: props.api.binder ?? {},
  });

  addBinderDataToFields();
});

watch(
  () => props.api,
  (newData) => leaveAlertWhenDataChanges(newData),
  { deep: true }
);

watch(submitOK, () => leaveAlertWhenDataChanges(props.api));

onBeforeUnmount(() => {
  leaveAlertWhenDataChanges(props.api);
  removeForm(props.id);
});

provide("dataformsStore", dataformsStore);

defineExpose({
  setLoading,
  changeLeaf,
  dataformsStore,
  submit,
});
</script>

<template>
  <v-form ref="vFormRef" @submit.prevent="submit">
    <transition-group name="form">
      <v-row key="form_row">
        <v-col
          v-for="(row, i) in api.rows"
          v-show="!row.hidden"
          v-bind="{ ...$attrs, ...(row.responsive || {}) }"
          :key="i"
          cols="12"
        >
          <Row :id="id" :row="row" :loading="loading">
            <template v-for="inputSlot in getApiSlots(row)" #[inputSlot]="{ item }">
              <slot :name="inputSlot" :item="item" />
            </template>
            <template #rowSlot>
              <v-col v-for="(slot, slotKey) in row.slots" :key="slotKey" cols="12">
                <slot :name="slot" />
              </v-col>
            </template>
          </Row>
        </v-col>
      </v-row>
    </transition-group>
    <v-row>
      <v-col class="d-flex align-center justify-end">
        <slot name="buttons" />
        <v-btn
          v-if="typeof api.submit === 'object'"
          type="submit"
          class="ms-2"
          :loading="loading"
          :text="api.submit.title"
          v-bind="api.submit.options || {}"
        />
      </v-col>
    </v-row>
  </v-form>
</template>
