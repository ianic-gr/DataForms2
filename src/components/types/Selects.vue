<script setup>
import { useInputEvents } from "@/composables/useInputEvents";
import { useFieldType } from "@/composables/useFieldType";

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

const { field, fieldProps } = useFieldType(props);
const { onSelect } = useInputEvents(fieldProps);
</script>

<template>
  <v-select
    v-model="field"
    v-bind="{ ...$attrs, ...options }"
    v-on="events"
    item-title="text"
    item-value="value"
    @click="
      () => events && events.hasOwnProperty('onClick') && events.onClick()
    "
    @change="onSelect"
  >
    <template v-slot:append><slot name="append"></slot></template
  ></v-select>
</template>
