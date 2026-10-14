<script setup>
  import { useFieldType } from "@/composables/useFieldType";
  import { useField } from "vee-validate";
  import { deepEqual } from "@/utils/deepEqual";

  defineOptions({ inheritAttrs: false });

  const dataformsPluginOptions = inject("dataformsPluginOptions");

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

  const showPassword = ref(false);

  const fieldType = computed(() => (showPassword.value ? "text" : "password"));

  const fieldIcon = computed(() =>
    showPassword.value ? dataformsPluginOptions?.icons.eye : dataformsPluginOptions?.icons.eyeOff
  );

  const fieldReturn = defineModel("return");

  const mask = (v) => "*".repeat(String(v ?? "").length);

  watch(
    fieldValue,
    (v) => {
      if (v === null) return;

      const masked = mask(v);

      if (deepEqual(v, fieldModel.value) && masked === fieldReturn.value) return;

      fieldModel.value = v;
      fieldReturn.value = masked;
    },
    { immediate: true }
  );
</script>

<template>
  <div>
    <v-text-field
      v-model="fieldValue"
      v-bind="{ ...$attrs, ...options }"
      :append-inner-icon="fieldIcon"
      :type="fieldType"
      :error-messages="errorMessage"
      @click:append-inner="showPassword = !showPassword"
      @click="() => events && events.hasOwnProperty('onClick') && events.onClick()"
    >
      <template v-for="(inputSlot, inputSlotKey) in input.itemSlots" :key="inputSlotKey" #[inputSlot.slot]="slotProps">
        <slot :name="inputSlot.template" v-bind="slotProps" />
      </template>

      <template v-if="$slots.append" #append>
        <slot name="append" />
      </template>
    </v-text-field>
  </div>
</template>
