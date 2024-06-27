<script setup>
import { useFieldType } from "@/composables/useFieldType";
import { useOptionFieldType } from "@/composables/useOptionFieldType";

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

const { field } = useFieldType(props);
const { optionLabel, optionValue } = useOptionFieldType();
</script>

<template>
  <v-radio-group v-model="field" v-bind="{ ...$attrs, ...options }">
    <v-radio
      v-for="(radio, i) in options.list || options.items"
      :key="i"
      :label="optionLabel(radio)"
      :value="optionValue(radio)"
    ></v-radio>
  </v-radio-group>
</template>
