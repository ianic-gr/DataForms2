<script setup>
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useDataformsStore } from "@/stores/dataFormsStore";
import { useSlotsPrepare } from "@/composables/useSlotsPrepare.js";
import { defineRule, useForm } from "vee-validate";
import { all } from "@vee-validate/rules";
import { getValidations } from "@/utils/getValidations";

Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule);
});

const dataformsStore = useDataformsStore();
const { getApiSlots } = useSlotsPrepare();

const {
  getCurrentForm,
  addForm,
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
]);

const { forms } = storeToRefs(dataformsStore);
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
});

const leaveAlertWhenDataChanges = (data) => {
  if ("binder" in data) {
    if (!initBinder.value) {
      initBinderValues.value = { ...data.binder } ?? {};
      initBinder.value = true;
    }

    if (
      JSON.stringify(initBinderValues.value) !== JSON.stringify(data.binder) &&
      !submitOK.value
    ) {
      window.onbeforeunload = function () {
        return true;
      };
    } else {
      window.onbeforeunload = null;
    }

    updateBinder({
      formId: props.id,
      binder: data.binder,
    });
  }
};

const submit = () => {
  submitOK.value = false;

  makeFormInvalid(props.id);

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

const validateBinder = () => {
  const binderData = {};
  let validated = true;

  if (!props.api.binder) return true;

  Object.keys(props.api.binder).forEach((item) => {
    let data = props.api.binder[item];

    if (typeof data === "object" && data !== null) {
      if (data.invalid) {
        console.error("Binder value is not valid: ", item);
        validated = false;

        // this.$refs.observer.setErrors({
        //   name: data.error,
        // });
        return;
      }

      data.invalid = false;
    }

    binderData[item] = data;
    addField({
      formId: props.id,
      fieldName: item,
      fieldValue: data,
    });
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

  watch(
    () => props.api,
    (newData) => leaveAlertWhenDataChanges(newData),
    { deep: true }
  );

  watch(
    () => submitOK.value,
    () => leaveAlertWhenDataChanges(props.api)
  );
});

const { handleSubmit } = useForm({
  validationSchema: getValidations(props.api),
});

const submitSuccess = (binder) => {
  if (binder) {
    const theForm = getCurrentForm(props.id);

    if (props.api.submit) {
      props.api.submit.click(theForm.fields);
    }

    makeFormValid(props.id);
    submitOK.value = true;

    document.dispatchEvent(submitSuccessEvent);
    emit("dataFormSubmitSuccess");
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

provide("dataformsStore", dataformsStore);

defineExpose({
  setLoading,
  changeLeaf,
  dataformsStore,
});
</script>

<template>
  <v-form @submit.prevent="submit" ref="vFormRef">
    <transition-group name="form">
      <v-row key="form_row">
        <v-col
          cols="12"
          v-show="!row.hidden"
          v-bind="{ ...$attrs, ...(row.responsive || {}) }"
          v-for="(row, i) in api.rows"
          :key="i"
        >
          <Row :row="row" :id="id" :loading="loading">
            <template
              v-for="inputSlot in getApiSlots(row)"
              #[inputSlot]="{ item }"
            >
              <slot :name="inputSlot" :item="item" />
            </template>
            <template v-slot:rowSlot>
              <v-col
                cols="12"
                v-for="(slot, slotKey) in row.slots"
                :key="slotKey"
              >
                <slot :name="slot" />
              </v-col>
            </template>
          </Row>
        </v-col>
      </v-row>
    </transition-group>
    <v-row v-if="typeof api.submit === 'object'">
      <v-col class="text-end">
        <v-btn
          type="submit"
          :loading="loading"
          v-bind="{ ...$attrs, ...(api.submit.options || {}) }"
          :color="api.submit.color"
        >
          <v-icon
            v-bind="{ ...$attrs, ...(api.submit.icon.options || {}) }"
            v-if="api.submit.icon"
          >
            {{ api.submit.icon.symbol }}
          </v-icon>

          {{ api.submit.title }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
