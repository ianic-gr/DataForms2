<script setup>
  import { useFieldType } from "@/composables/useFieldType";
  import { useOptionFieldType } from "@/composables/useOptionFieldType";
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
    theme: {
      type: String,
      default: "Plain",
    },
  });

  const { field: fieldValue } = useFieldType(props);

  const { value: fieldModel, errorMessage } = useField(props.inputKey, !props.input.readOnly ? props.input.validation : "", {
    initialValue: props.options.default,
  });

  const { optionLabel, optionValue } = useOptionFieldType();

  const fieldReturn = defineModel("return");

  const currentTheme = computed(() => props.options.theme ?? props.theme);
  const checkboxItems = computed(() => props.options.items || []);

  const labelFor = (value) => {
    const selected = checkboxItems.value.find((item) => deepEqual(optionValue(item), value));
    return selected ? optionLabel(selected) : value;
  };

  const toReturnValue = (v) => (Array.isArray(v) ? v.map(labelFor) : labelFor(v));

  watch(
    fieldValue,
    (v) => {
      if (v === null) return;

      const returnValue = toReturnValue(v);

      if (deepEqual(v, fieldModel.value) && deepEqual(returnValue, fieldReturn.value)) return;

      fieldModel.value = v;
      fieldReturn.value = returnValue;
    },
    { immediate: true }
  );
</script>

<template>
  <div>
    <p v-if="currentTheme !== 'Fluid'">
      {{ options.label || "" }}
      <slot name="append" />
    </p>
    <v-checkbox
      v-for="(checkb, i) in checkboxItems"
      :key="i"
      v-model="fieldValue"
      v-bind="{ ...$attrs, ...options }"
      :label="optionLabel(checkb)"
      :value="optionValue(checkb)"
      :error-messages="errorMessage"
      v-on="events"
    >
      <template v-for="(inputSlot, inputSlotKey) in input.itemSlots" :key="inputSlotKey" #[inputSlot.slot]="slotProps">
        <slot :name="inputSlot.template" v-bind="slotProps" />
      </template>
    </v-checkbox>
  </div>
</template>
