<script setup>
import { useDateTimeFieldType } from "@/composables/useDateTimeFieldType";
import { useField } from "vee-validate";
import { VDateInput } from "vuetify/labs/VDateInput";
import moment from "moment";

const props = defineProps({
  input: {
    type: Object,
    default: () => ({}),
  },
  inputKey: {
    type: String,
    default: "",
  },
  options: {
    type: Object,
    default: () => ({}),
  },
  formId: {
    required: true,
    type: String,
  },
  events: {
    type: Object,
    default: () => ({}),
  },
});

const inputField = useField(
  props.inputKey,
  !props.input.readOnly ? props.input.validation : ""
);
const { field, date, formattedDate } = useDateTimeFieldType(props);

const fieldReturn = defineModel("return");

watch(
  field,
  (v) => {
    if (v === null && !fieldReturn.value) return;

    inputField.value.value = formattedDate.value;
    fieldReturn.value = formattedDate.value;
  },
  { immediate: true }
);

function format(date) {
  return moment(date, props.options.returnFormat).format(props.options.format);
}
</script>

<template>
  <div>
    <v-date-input
      v-model="date"
      v-bind="{ ...options?.datepicker, ...options }"
      :display-format="format"
      :input-format="options.returnFormat.toLowerCase()"
      :error-messages="inputField.errorMessage.value"
      v-on="events"
    >
      <template
        v-for="(inputSlot, inputSlotKey) in input.itemSlots"
        :key="inputSlotKey"
        #[inputSlot.slot]="slotProps"
      >
        <slot :name="inputSlot.template" v-bind="slotProps" />
      </template>
    </v-date-input>
  </div>
</template>
