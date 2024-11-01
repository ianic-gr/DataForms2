<script setup>
import { useFieldType } from "@/composables/useFieldType";
import { useField } from "vee-validate";

const props = defineProps({
  input: {
    type: Object,
    default: () => {
      return {};
    },
  },
  inputKey: {
    type: String,
    default: "",
  },
  options: {
    type: Object,
    default: () => {
      return {};
    },
  },
  formId: {
    required: true,
    type: String,
  },
  events: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const { field: fieldValue } = useFieldType(props);
const field = useField(props.inputKey);

watch(fieldValue, (v) => {
  field.value.value = v;
});
const showPassword = ref(false);

const fieldType = computed(() => {
  return showPassword.value ? "text" : "password";
});

const fieldIcon = computed(() => {
  return showPassword.value ? "mdi-eye" : "mdi-eye-off";
});
</script>

<template>
  <div
    :class="`dataforms-field dataforms-password--${formId}_${inputKey} dataforms-password--${formId} dataforms-password--${inputKey}`"
  >
    <v-text-field
      v-model="fieldValue"
      :append-icon="fieldIcon"
      :type="fieldType"
      @click:append="showPassword = !showPassword"
      @click="
        () => events && events.hasOwnProperty('onClick') && events.onClick()
      "
      v-bind="{ ...$attrs, ...options }"
      :error-messages="field.errorMessage.value"
    >
      <template v-slot:append><slot name="append"></slot></template>
    </v-text-field>
  </div>
</template>
