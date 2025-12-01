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
const field = useField(props.inputKey, !props.input.readOnly ? props.input.validation : "");
const { optionLabel, optionValue } = useOptionFieldType();

const fieldReturn = defineModel("return");

watch(
  fieldValue,
  (v) => {
    if (v === null && !fieldReturn.value) return;
    field.value.value = v;

    const selected = props.options?.list.find((item) => {
      return item.value === v;
    });

    fieldReturn.value = selected?.label ?? v;
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <v-radio-group v-model="fieldValue" v-bind="{ ...$attrs, ...options }" :error-messages="field.errorMessage.value">
      <v-radio
        v-for="(radio, i) in options.list || options.items"
        :key="i"
        :label="optionLabel(radio)"
        :value="optionValue(radio)"
      />
    </v-radio-group>
  </div>
</template>
