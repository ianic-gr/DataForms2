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
      errors: {},
      locale,
      locale_strings,
      unsaved: false,
    });
  };

  const removeForm = (form_id) => {
    const formIndex = forms.value.findIndex((form) => form.id === form_id);
    if (formIndex !== -1) {
      forms.value.splice(formIndex, 1);
    }
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

  const addField = (appendFieldData) => {
    updateData(appendFieldData);
  };

  const updateField = (appendFieldData) => {
    updateData(appendFieldData, true);
  };

  const updateData = (appendFieldData, unsaved = false) => {
    // Keep reactivity
    const computedForm = forms.value.map((form) => {
      if (form.id === appendFieldData.formId) {
        form.fields[appendFieldData.fieldName] = appendFieldData.fieldValue;

        if (unsaved) {
          form.unsaved = true;
        }
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
    removeForm,
    makeFormValid,
    makeFormInvalid,
    setFormErrors,
    addInput,
    addField,
    updateField,
  };
});
