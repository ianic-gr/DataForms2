<script setup>
  import { useInputEvents } from "@/composables/useInputEvents";
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

  const { onSelect } = useInputEvents(props);

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

  // Assign a new value instead of mutating in place. The watchers are not
  // deep, so `splice` would update the chips but not vee-validate or the store.
  const removeSelection = (index) => {
    if (Array.isArray(fieldValue.value)) {
      fieldValue.value = fieldValue.value.filter((_, i) => i !== index);
    } else {
      fieldValue.value = null;
    }
  };

  const isKnownItem = (item) => !!props.options.items?.some((o) => JSON.stringify(o) === JSON.stringify(item.raw));
</script>

<template>
  <div>
    <v-combobox
      v-model="fieldValue"
      v-bind="{ ...$attrs, ...options }"
      :error-messages="errorMessage"
      v-on="events"
      @click="() => events && events.hasOwnProperty('onClick') && events.onClick()"
      @change="onSelect"
    >
      <template v-for="(inputSlot, inputSlotKey) in input.itemSlots" :key="inputSlotKey" #[inputSlot.slot]="slotProps">
        <slot :name="inputSlot.template" v-bind="slotProps" />
      </template>

      <template #selection="{ item, index }">
        <v-chip
          v-if="item === Object(item)"
          :color="isKnownItem(item) ? 'primary' : 'dark'"
          :text="item.title"
          size="small"
          closable
          @click:close="removeSelection(index)"
        />
      </template>

      <template v-if="$slots.append" #append>
        <slot name="append" />
      </template>
    </v-combobox>
  </div>
</template>
