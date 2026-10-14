<script setup>
  import moment from "moment";
  import { useField } from "vee-validate";
  import { useDateTimeFieldType } from "@/composables/useDateTimeFieldType";

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

  const { value: inputModel, errorMessage } = useField(props.inputKey, !props.input.readOnly ? props.input.validation : "", {
    initialValue: props.options.default,
  });

  const { field, date, formattedDate, dateFormat, displayFormat } = useDateTimeFieldType(props);

  const fieldReturn = defineModel("return");

  const inputFormat = computed(() => dateFormat.value.toLowerCase());

  const formatDisplay = (value) => {
    const parsed = moment(value, dateFormat.value);
    return parsed.isValid() ? parsed.format(displayFormat.value) : "";
  };

  watch(
    field,
    (v) => {
      if (v === null) return;

      const formatted = formattedDate.value ?? "";

      if (formatted === fieldReturn.value && formatted === inputModel.value) return;

      inputModel.value = formatted;
      fieldReturn.value = formatted;
    },
    { immediate: true }
  );
</script>

<template>
  <div>
    <v-date-input
      v-model="date"
      v-bind="options"
      :display-format="formatDisplay"
      :input-format="inputFormat"
      :error-messages="errorMessage"
      v-on="events"
    >
      <template v-for="(inputSlot, inputSlotKey) in input.itemSlots" :key="inputSlotKey" #[inputSlot.slot]="slotProps">
        <slot :name="inputSlot.template" v-bind="slotProps" />
      </template>
    </v-date-input>
  </div>
</template>
