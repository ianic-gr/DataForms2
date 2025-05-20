<script setup>
import { useFieldType } from "@/composables/useFieldType";
import { useField } from "vee-validate";

const props = defineProps({
  input: {
    type: Object,
    default: () => {},
  },
  inputKey: {
    type: String,
    default: "",
  },
  options: {
    type: Object,
    default: () => {},
  },
  formId: {
    required: true,
    type: String,
  },
  events: {
    type: Object,
    default: () => {},
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
    if (v === null && !fieldReturn.value) return;

    field.value.value = v;
    fieldReturn.value = (Array.isArray(v) ? v : [v]).map((item) => item.name).join(", ");
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <v-file-input
      v-model="fieldValue"
      v-bind="{ ...$attrs, ...options }"
      :error-messages="field.errorMessage.value"
      v-on="props.events"
      @click="() => events && events.hasOwnProperty('onClick') && events.onClick()"
    >
      <template
        v-for="(inputSlot, inputSlotKey) in input.itemSlots"
        :key="inputSlotKey"
        #[inputSlot.slot]="slotProps"
      >
        <slot :name="inputSlot.template" v-bind="slotProps" />
      </template>
    </v-file-input>
  </div>
</template>
