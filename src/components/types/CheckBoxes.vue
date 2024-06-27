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
  <p v-if="theme !== 'Fluid'">
    {{ options.label || "" }}
    <slot name="append"></slot>
  </p>
  <v-checkbox
    v-model="field"
    v-bind="{
      ...$attrs,
      ...options,
    }"
    v-on="events"
    v-for="(checkb, i) in options.items"
    :key="i"
    :label="optionLabel(checkb)"
    :value="optionValue(checkb)"
  />
</template>
