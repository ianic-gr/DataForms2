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
</script>

<template>
  <div
    :class="`dataforms-field dataforms-switch--${formId}_${inputKey} dataforms-switch--${formId} dataforms-switch--${inputKey}`"
  >
    <v-switch
      v-model="fieldValue"
      v-bind="{
        ...$attrs,
        ...options,
      }"
      v-on="events"
      :error-messages="field.errorMessage.value"
    />
  </div>
</template>
