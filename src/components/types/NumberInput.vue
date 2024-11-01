<script setup>
import { useFieldType } from "@/composables/useFieldType";
import { useField } from "vee-validate";
import { VNumberInput } from "vuetify/labs/VNumberInput";

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

watch(fieldValue, (v) => {
  field.value.value = v;
});
</script>

<template>
  <div
    :class="`dataforms-field dataforms-numberInput--${formId}_${inputKey} dataforms-numberInput--${formId} dataforms-numberInput--${inputKey}`"
  >
    <v-number-input
      v-model="fieldValue"
      v-bind="{ ...$attrs, ...options }"
      v-on="events"
      @click="
        () => events && events.hasOwnProperty('onClick') && events.onClick()
      "
      :error-messages="field.errorMessage.value"
    >
      <template v-slot:append><slot name="append"></slot></template>
    </v-number-input>
  </div>
</template>
