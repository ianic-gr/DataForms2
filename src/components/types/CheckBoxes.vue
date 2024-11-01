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
</script>

<template>
  <div
    :class="`dataforms-field dataforms-checkBoxes--${formId}_${inputKey} dataforms-checkBoxes--${formId} dataforms-checkBoxes--${inputKey}`"
  >
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
