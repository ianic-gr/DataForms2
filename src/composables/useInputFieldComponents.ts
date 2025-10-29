import { defineAsyncComponent } from "vue";

export const useInputFieldComponents = () => {
  return {
    textField: defineAsyncComponent(() => import("@/components/types/TextField.vue")),
    textArea: defineAsyncComponent(() => import("@/components/types/TextArea.vue")),
    radioButtons: defineAsyncComponent(
      () => import("@/components/types/RadioButtons.vue")
    ),
    selects: defineAsyncComponent(() => import("@/components/types/Selects.vue")),
    autocomplete: defineAsyncComponent(
      () => import("@/components/types/Autocomplete.vue")
    ),
    combobox: defineAsyncComponent(() => import("@/components/types/Combobox.vue")),
    switchButton: defineAsyncComponent(() => import("@/components/types/Switch.vue")),
    checkBoxes: defineAsyncComponent(() => import("@/components/types/CheckBoxes.vue")),
    numberInput: defineAsyncComponent(() => import("@/components/types/NumberInput.vue")),
    datepicker: defineAsyncComponent(() => import("@/components/types/Datepicker.vue")),
    dateTimePicker: defineAsyncComponent(
      () => import("@/components/types/DateTimePicker.vue")
    ),
    password: defineAsyncComponent(() => import("@/components/types/Password.vue")),
    epic: defineAsyncComponent(() => import("@/components/types/Epic.vue")),
    fileInput: defineAsyncComponent(() => import("@/components/types/FileInput.vue")),
    fileUpload: defineAsyncComponent(() => import("@/components/types/FileUpload.vue")),
    dynamic: defineAsyncComponent(() => import("@/components/types/dynamic.vue")),
  } as Record<string, any>;
};
