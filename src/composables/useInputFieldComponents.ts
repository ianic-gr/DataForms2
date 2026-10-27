import { defineAsyncComponent } from "vue";
import autocomplete from "@/components/types/Autocomplete.vue";
import selects from "@/components/types/Selects.vue";
import textField from "@/components/types/TextField.vue";

const inputFieldComponents = {
  autocomplete,
  checkBoxes: defineAsyncComponent(() => import("@/components/types/CheckBoxes.vue")),
  combobox: defineAsyncComponent(() => import("@/components/types/Combobox.vue")),
  datepicker: defineAsyncComponent(() => import("@/components/types/Datepicker.vue")),
  dateTimePicker: defineAsyncComponent(() => import("@/components/types/DateTimePicker.vue")),
  dynamic: defineAsyncComponent(() => import("@/components/types/dynamic.vue")),
  epic: defineAsyncComponent(() => import("@/components/types/Epic.vue")),
  fileInput: defineAsyncComponent(() => import("@/components/types/FileInput.vue")),
  fileUpload: defineAsyncComponent(() => import("@/components/types/FileUpload.vue")),
  numberInput: defineAsyncComponent(() => import("@/components/types/NumberInput.vue")),
  password: defineAsyncComponent(() => import("@/components/types/Password.vue")),
  radioButtons: defineAsyncComponent(() => import("@/components/types/RadioButtons.vue")),
  selects,
  switchButton: defineAsyncComponent(() => import("@/components/types/Switch.vue")),
  textArea: defineAsyncComponent(() => import("@/components/types/TextArea.vue")),
  textField,
} as Record<string, any>;

export const useInputFieldComponents = () => inputFieldComponents;
