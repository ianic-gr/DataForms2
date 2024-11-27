<script setup>
import { useInputEvents } from "@/composables/useInputEvents";
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

const { field: fieldValue, fieldProps } = useFieldType(props);
const field = useField(
  props.inputKey,
  !props.input.readOnly ? props.input.validation : ""
);
const { onSelect } = useInputEvents(fieldProps);

const fieldReturn = defineModel("return");

watch(
  fieldValue,
  (v) => {
    if (v === null) return;
    field.value.value = v;

    const selected = props.options?.items.find((item) => {
      return item.value === v;
    });

    fieldReturn.value = selected?.text ?? v;
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <v-select
      v-model="fieldValue"
      v-bind="{ ...$attrs, ...options }"
      v-on="events"
      item-title="text"
      item-value="value"
      @click="
        () => events && events.hasOwnProperty('onClick') && events.onClick()
      "
      @change="onSelect"
      :error-messages="field.errorMessage.value"
    >
      <template v-slot:append><slot name="append"></slot></template
    ></v-select>
  </div>
</template>
