// Utilities
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDataformsStore = defineStore("dataforms", () => {
  const forms = ref([]);

  const getForms = () => {
    return forms.value;
  };

  const getCurrentForm = (formId) => {
    return forms.value.find((form) => {
      return form.id === formId;
    });
  };

  const isFormValid = (formId) => {
    const { valid } = forms.value.find((form) => {
      return form.id === formId;
    });

    return valid;
  };

  const addForm = ({ form_id, locale, locale_strings }) => {
    const formExists = forms.value.find((form) => form.id === form_id);

    if (formExists) return;

    forms.value.push({
      id: form_id,
      valid: false,
      fields: {},
      inputs: {},
      binder: {},
      errors: {},
      locale,
      locale_strings,
    });
  };

  const makeFormValid = (formId) => {
    forms.value.find((form) => {
      return form.id === formId;
    }).valid = true;
  };

  const makeFormInvalid = (formId) => {
    forms.value.find((form) => {
      return form.id === formId;
    }).valid = false;
  };

  const setFormErrors = (payload) => {
    forms.value.find((form) => {
      return form.id === payload.formId;
    }).errors = payload.errors;
  };

  const addInput = (formID, key, input) => {
    // Keep reactivity
    const computedForm = forms.value.map((form) => {
      if (form.id === formID) {
        form.inputs[key] = input;
      }

      return form;
    });

    forms.value = computedForm;
  };

  const addField = (appendFieldData) => updateField(appendFieldData);

  const updateField = (appendFieldData) => {
    // Keep reactivity
    const computedForm = forms.value.map((form) => {
      if (form.id === appendFieldData.formId) {
        form.fields[appendFieldData.fieldName] = appendFieldData.fieldValue;
        form.binder[appendFieldData.fieldName] = appendFieldData.fieldValue;
      }

      return form;
    });

    forms.value = computedForm;
  };

  const updateBinder = (appendFieldData) => {
    // Keep reactivity
    const computedForm = forms.value.map((form) => {
      if (form.id === appendFieldData.formId) {
        form.binder = appendFieldData.binder;
      }
      return form;
    });

    forms.value = computedForm;
  };

  return {
    forms,
    getForms,
    getCurrentForm,
    isFormValid,
    addForm,
    makeFormValid,
    makeFormInvalid,
    setFormErrors,
    addInput,
    addField,
    updateField,
    updateBinder,
  };
});
