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
  });

  const { field: fieldValue } = useFieldType(props);

  const { value: fieldModel, errorMessage } = useField(props.inputKey, !props.input.readOnly ? props.input.validation : "", {
    initialValue: props.options.default,
  });

  const { optionLabel, optionValue } = useOptionFieldType();

  const fieldReturn = defineModel("return");

  const radioItems = computed(() => props.options.list || props.options.items || []);

  watch(
    fieldValue,
    (v) => {
      if (v === null) return;

      const selected = radioItems.value.find((item) => deepEqual(optionValue(item), v));
      const returnValue = selected ? optionLabel(selected) : v;

      if (deepEqual(v, fieldModel.value) && deepEqual(returnValue, fieldReturn.value)) return;

      fieldModel.value = v;
      fieldReturn.value = returnValue;
    },
    { immediate: true }
  );
</script>

<template>
  <div>
    <v-radio-group v-model="fieldValue" v-bind="{ ...$attrs, ...options }" :error-messages="errorMessage">
      <v-radio v-for="(radio, i) in radioItems" :key="i" :label="optionLabel(radio)" :value="optionValue(radio)" />
    </v-radio-group>
  </div>
</template>
