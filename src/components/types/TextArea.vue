<script setup>
  import { useFieldType } from "@/composables/useFieldType";
  import { useField } from "vee-validate";
  import { deepEqual } from "@/utils/deepEqual";

  defineOptions({ inheritAttrs: false });

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

  const { field: fieldValue } = useFieldType(props);

  const { value: fieldModel, errorMessage } = useField(props.inputKey, !props.input.readOnly ? props.input.validation : "", {
    initialValue: props.options.default,
  });

  const fieldReturn = defineModel("return");

  watch(
    fieldValue,
    (v) => {
      if (v === null) return;
      if (deepEqual(v, fieldModel.value) && deepEqual(v, fieldReturn.value)) return;

      fieldModel.value = v;
      fieldReturn.value = v;
    },
    { immediate: true }
  );
</script>

<template>
  <div>
    <v-textarea
      v-model="fieldValue"
      v-bind="{ ...$attrs, ...options }"
      :error-messages="errorMessage"
      v-on="events"
      @click="() => events && events.hasOwnProperty('onClick') && events.onClick()"
    >
      <template v-for="(inputSlot, inputSlotKey) in input.itemSlots" :key="inputSlotKey" #[inputSlot.slot]="slotProps">
        <slot :name="inputSlot.template" v-bind="slotProps" />
      </template>

      <template v-if="$slots.append" #append>
        <slot name="append" />
      </template>
    </v-textarea>
  </div>
</template>
