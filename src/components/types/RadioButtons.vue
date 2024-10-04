<script setup>
import { useFieldType } from "@/composables/useFieldType";
import { useOptionFieldType } from "@/composables/useOptionFieldType";
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
  name: {
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
const { optionLabel, optionValue } = useOptionFieldType();

watch(fieldValue, (v) => {
  field.value.value = v;
});
</script>

<template>
  <v-radio-group
    v-model="fieldValue"
    v-bind="{ ...$attrs, ...options }"
    :error-messages="field.errorMessage.value"
  >
    <v-radio
      v-for="(radio, i) in options.list || options.items"
      :key="i"
      :label="optionLabel(radio)"
      :value="optionValue(radio)"
    ></v-radio>
  </v-radio-group>
</template>
