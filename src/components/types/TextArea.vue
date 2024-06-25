<script setup>
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

const { field } = useFieldType(props);
</script>

<template>
  <v-textarea
    v-model="field"
    v-bind="{ ...$attrs, ...options }"
    v-on="events"
    @click="
      () => events && events.hasOwnProperty('onClick') && events.onClick()
    "
  >
    <template v-slot:append><slot name="append"></slot></template>
  </v-textarea>
</template>
