<script setup>
  import { useFieldType } from "@/composables/useFieldType";
  import { useField } from "vee-validate";
  import { deepEqual } from "@/utils/deepEqual";

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
  const field = useField(props.inputKey, !props.input.readOnly ? props.input.validation : "", {
    initialValue: props.options.default,
  });

  const fieldReturn = defineModel("return");

  watch(
    fieldValue,
    (v) => {
      if ((v === null && !fieldReturn.value) || deepEqual(v, props.options.default)) return;

      field.value.value = v;
      fieldReturn.value = v;
    },
    { immediate: true }
  );
</script>

<template>
  <div>
    <v-switch
      v-model="fieldValue"
      v-bind="{
        ...$attrs,
        ...options,
      }"
      :error-messages="field.errorMessage.value"
      v-on="events"
    >
      <template v-for="(inputSlot, inputSlotKey) in input.itemSlots" :key="inputSlotKey" #[inputSlot.slot]="slotProps">
        <slot :name="inputSlot.template" v-bind="slotProps" />
      </template>
    </v-switch>
  </div>
</template>
