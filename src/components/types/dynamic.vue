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
const field = useField(
  props.inputKey,
  !props.input.readOnly ? props.input.validation : ""
);

const fieldReturn = defineModel("return");

watch(
  fieldValue,
  (v) => {
    if (v === null) return;
    field.value.value = v;
    fieldReturn.value = v;
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <component
      v-if="input.component"
      :is="input.component"
      v-model="fieldValue"
      v-bind="{ ...$attrs, ...options }"
      v-on="events"
      @click="
        () => events && events.hasOwnProperty('onClick') && events.onClick()
      "
      :error-messages="field.errorMessage.value"
    >
      <template v-slot:append><slot name="append"></slot></template>
    </component>
    <span v-else>No component provided</span>
  </div>
</template>
