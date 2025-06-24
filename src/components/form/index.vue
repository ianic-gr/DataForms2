<script setup lang="ts">
import { ref, onMounted, watch, provide, onBeforeUnmount, nextTick, computed } from "vue";
import { useDataformsStore } from "@/stores/dataFormsStore";
import { useSlotsPrepare } from "@/composables/useSlotsPrepare";
import { defineRule, useForm, configure } from "vee-validate";
import { all } from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import deepClone from "@/utils/deepClone";
import { defu } from "defu";

const binder = defineModel<Record<string, any>>("binder", { default: () => ({}) });
const validation = defineModel<Record<string, any>>("validation", {
  default: () => ({}),
});

interface Props {
  id: string;
  api: Record<string, any>;
  locale?: string;
  localeStrings?: Record<string, any>;
  options?: Record<string, any>;
}
const props = withDefaults(defineProps<Props>(), {
  locale: "en",
  localeStrings: () => ({}),
  options: () => ({}),
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
  makeFormValid,
  makeFormInvalid,
  setFormErrors,
} = dataformsStore;

const vFormRef = ref();
const loading = ref(false);
const submitOK = ref(false);
const submitEvent = new Event("dataFormSubmit");
const submitSuccessEvent = new CustomEvent("dataFormSubmitSuccess", {
  detail: { formID: props.id },
});
const submitFailedEvent = new CustomEvent("dataFormSubmitFailed", {
  detail: { formID: props.id },
});

const initFormValues = ref();

const theForm = computed(() => getCurrentForm(props.id));

const initFormValuesFn = async () => {
  await nextTick();

  if (!initFormValues.value) {
    initFormValues.value = deepClone(theForm.value.fields ?? {});
  }
};

const leaveAlertWhenDataChanges = (event: any) => {
  if (!props.options.leaveAlertWhenDataChanges) return;

  if (
    JSON.stringify(initFormValues.value) !== JSON.stringify(theForm.value.fields) &&
    !submitOK.value
  ) {
    event.preventDefault();
    event.returnValue = "";
  }
};

const setLoading = (value: boolean) => {
  loading.value = value;
};

const changeLeaf = (leaf: number) => {
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

const { handleSubmit, setFieldError } = useForm();

const submit = async (softSubmit = false) => {
  submitOK.value = false;
  makeFormInvalid(props.id);

  if (props.api.submit?.beforeSubmit) {
    await props.api.submit.beforeSubmit(theForm.value.fields);
  }

  setFormErrors({
    formId: props.id,
    errors: {},
  });

  document.dispatchEvent(submitEvent);
  emit("dataFormSubmit");

  handleSubmit(
    async () => {
      const validationErrors = Object.entries(validation.value)
        .filter(([, value]) => value !== null)
        .reduce((acc: any, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

      if (Object.keys(validationErrors).length) {
        Object.entries(validationErrors).forEach(([field, error]: any) => {
          setFieldError(field, error);
        });

        submitErrors(validationErrors);
        return;
      }

      if (softSubmit) return;
      submitSuccess();
    },
    (validationErrors) => {
      submitErrors(validationErrors.errors);
    }
  )();
};

const validateOnly = () => submit(true);

const submitSuccess = async () => {
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
};

const submitErrors = (errors: Record<string, any>) => {
  setFormErrors({
    formId: props.id,
    errors,
  });

  document.dispatchEvent(submitFailedEvent);
  emit("dataFormSubmitFailed");
  scrollToError();
};

const loadLocale = async (locale: string) => {
  try {
    const localeMap: Record<string, any> = {
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

    const fieldLabels: Record<string, any> = {};

    if (theForm.value?.inputs) {
      Object.entries(theForm.value.inputs).forEach(([key, input]: any) => {
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
  initFormValuesFn();
});

onMounted(async () => {
  addForm({
    form_id: props.id,
    locale: props.locale,
    locale_strings: props.localeStrings,
  });

  await nextTick();

  theForm.value.fields = defu(binder.value, theForm.value.fields);
  binder.value = theForm.value.fields;

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
