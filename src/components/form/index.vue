<script setup>
import { ref, onMounted, watch, provide, onBeforeUnmount } from "vue";
import { useDataformsStore } from "@/stores/dataFormsStore";
import { useSlotsPrepare } from "@/composables/useSlotsPrepare.js";
import { defineRule, useForm, configure } from "vee-validate";
import { all } from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import deepClone from "@/utils/deepClone";

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

const emit = defineEmits([
  "dataFormSubmit",
  "dataFormSubmitSuccess",
  "dataFormSubmitFailed",
  "dataFormSubmitWithErrors",
]);

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

const vFormRef = ref(null);
const loading = ref(false);
const submitOK = ref(false);
const submitEvent = new Event("dataFormSubmit");
const submitSuccessEvent = new CustomEvent("dataFormSubmitSuccess", {
  detail: { formID: props.id },
});
const submitFailedEvent = new CustomEvent("dataFormSubmitFailed", {
  detail: { formID: props.id },
});

const initBinderValues = ref();

const theForm = computed(() => getCurrentForm(props.id));

const initBinderFn = async () => {
  await nextTick();

  if ("binder" in props.api) {
    updateBinder({
      formId: props.id,
      binder: props.api.binder ?? {},
    });
  }

  if (!initBinderValues.value) {
    initBinderValues.value = deepClone(theForm.value.binder ?? {});
  }
};

const leaveAlertWhenDataChanges = (event) => {
  if (!props.options.leaveAlertWhenDataChanges) return;

  if (
    JSON.stringify(initBinderValues.value) !== JSON.stringify(theForm.value.binder) &&
    !submitOK.value
  ) {
    event.preventDefault();
    event.returnValue = "";
  }
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
  const vFormEL = vFormRef.value?.$el;
  const el = vFormEL?.querySelector(".v-input--error:first-of-type");

  if (el) {
    const yOffset = -200;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const { handleSubmit } = useForm();

const submit = async (softSubmit = false) => {
  submitOK.value = false;
  makeFormInvalid(props.id);

  if (props.api.submit?.beforeSubmit) {
    await props.api.submit.beforeSubmit(theForm.value.fields);
  }

  const binder = validateBinder();

  setFormErrors({
    formId: props.id,
    errors: {},
  });

  document.dispatchEvent(submitEvent);
  emit("dataFormSubmit");

  handleSubmit(
    () => {
      if (softSubmit) return;
      submitSuccess(binder);
    },
    (validationErrors) => submitErrors(validationErrors.errors)
  )();
};

const validateOnly = () => submit(true);

const submitSuccess = async (binder) => {
  if (binder) {
    const theForm = getCurrentForm(props.id);

    makeFormValid(props.id);
    submitOK.value = true;

    try {
      if (props.api.submit) {
        await props.api.submit.click(theForm.fields);
      }

      document.dispatchEvent(submitSuccessEvent);
      emit("dataFormSubmitSuccess", theForm.fields);

      theForm.unsaved = false;
    } catch (error) {
      emit("dataFormSubmitWithErrors", error);
    }
  } else {
    submitErrors([]);
  }
};

const submitErrors = (errors) => {
  setFormErrors({
    formId: props.id,
    errors,
  });

  document.dispatchEvent(submitFailedEvent);
  emit("dataFormSubmitFailed");
  scrollToError();
};

const loadLocale = async (locale) => {
  try {
    const localeMap = {
      en: () => import("@vee-validate/i18n/dist/locale/en.json"),
      el: () => import("@vee-validate/i18n/dist/locale/el.json"),
      de: () => import("@vee-validate/i18n/dist/locale/de.json"),
      ro: () => import("@vee-validate/i18n/dist/locale/ro.json"),
    };

    if (!localeMap[locale]) {
      console.warn(`Unsupported locale: ${locale}`);
      return;
    }

    const { default: localeMessages } = await localeMap[locale]();

    const fieldLabels = {};

    if (theForm?.inputs) {
      Object.entries(theForm.value.inputs).forEach(([key, input]) => {
        const label = input?.options?.label;
        if (label) {
          fieldLabels[key] = `${label} (${key})`;
        }
      });
    }

    configure({
      generateMessage: localize({
        [locale]: {
          ...localeMessages,
          names: fieldLabels,
        },
      }),
    });

    localize(locale);
  } catch (err) {
    console.warn(`Failed to load validation messages for locale: ${locale}`, err);
  }
};

watch(theForm, async () => {
  await nextTick();
  initBinderFn();
});

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
  loadLocale(props.locale);

  window.addEventListener("beforeunload", leaveAlertWhenDataChanges);
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", leaveAlertWhenDataChanges);
  removeForm(props.id);
});

provide("dataformsStore", dataformsStore);

defineExpose({
  setLoading,
  changeLeaf,
  dataformsStore,
  submit,
  validateOnly,
});
</script>

<template>
  <v-form ref="vFormRef" @submit.prevent="submit()">
    <transition-group name="form">
      <Row v-for="(row, i) in api.rows" :id="id" :key="i" :row="row" :loading="loading">
        <template
          v-for="(inputSlot, inputSlotKey) in getApiSlots(row)"
          :key="inputSlotKey"
          #[inputSlot.template]="slotProps"
        >
          <slot :name="inputSlot.template" v-bind="slotProps" />
        </template>
        <template #rowSlot>
          <v-col v-for="(slot, slotKey) in row.slots" :key="slotKey" cols="12">
            <slot :name="slot" />
          </v-col>
        </template>
      </Row>
    </transition-group>
    <v-row class="dataforms-actions-row">
      <v-col
        v-if="typeof api.submit === 'object' || $slots.buttons"
        class="d-flex align-center justify-end"
      >
        <slot
          name="buttons"
          :submit-props="{ type: 'submit', class: 'ms-2', ...(api.submit.options || {}) }"
        />
        <v-btn
          v-if="typeof api.submit === 'object' && !$slots.buttons"
          type="submit"
          class="ms-2"
          :loading="loading"
          v-bind="api.submit.options || {}"
        />
      </v-col>
    </v-row>
  </v-form>
</template>
