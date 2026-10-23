<script setup>
  import { useFieldType } from "@/composables/useFieldType";
  import { useField } from "vee-validate";

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

  // `return` holds a comma-separated list of file names
  const fileNames = (v) => {
    if (v === null || v === undefined) return "";
    return (Array.isArray(v) ? v : [v])
      .map((item) => item?.name ?? "")
      .filter(Boolean)
      .join(", ");
  };

  watch(
    fieldValue,
    (v) => {
      if (v === null) return;

      const names = fileNames(v);

      if (v === fieldModel.value && names === fieldReturn.value) return;

      fieldModel.value = v;
      fieldReturn.value = names;
    },
    { immediate: true }
  );
</script>

<template>
  <div>
    <v-file-input
      v-model="fieldValue"
      v-bind="{ ...$attrs, ...options }"
      :error-messages="errorMessage"
      v-on="events"
      @click="() => events && events.hasOwnProperty('onClick') && events.onClick()"
    >
      <template v-for="(inputSlot, inputSlotKey) in input.itemSlots" :key="inputSlotKey" #[inputSlot.slot]="slotProps">
        <slot :name="inputSlot.template" v-bind="slotProps" />
      </template>
    </v-file-input>
  </div>
</template>
