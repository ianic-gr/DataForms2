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

const fieldReturn = defineModel("return");

watch(
  fieldValue,
  (v) => {
    if (v === null) return;
    field.value.value = v;

    const selected = props.options?.items.find((item) => {
      return item.value === v;
    });

    fieldReturn.value = selected?.label ?? v;
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <p v-if="theme !== 'Fluid'">
      {{ options.label || "" }}
      <slot name="append"></slot>
    </p>
    <v-checkbox
      v-model="fieldValue"
      v-bind="{
        ...$attrs,
        ...options,
      }"
      v-on="events"
      v-for="(checkb, i) in options.items"
      :key="i"
      :label="optionLabel(checkb)"
      :value="optionValue(checkb)"
      :error-messages="field.errorMessage.value"
    />
  </div>
</template>
