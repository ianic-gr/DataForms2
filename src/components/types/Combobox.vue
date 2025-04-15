<script setup>
import { useInputEvents } from "@/composables/useInputEvents";
import { useFieldType } from "@/composables/useFieldType";
import { useField } from "vee-validate";

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

const { field: fieldValue, fieldProps } = useFieldType(props);
const field = useField(
  props.inputKey,
  !props.input.readOnly ? props.input.validation : ""
);
const { onSelect } = useInputEvents(fieldProps);

const fieldReturn = defineModel("return");

watch(
  fieldValue,
  (v) => {
    if (v === null) return;
    field.value.value = v;

    const selected = props.options?.items.find((item) => {
      return item.value === v;
    });

    fieldReturn.value = selected?.text ?? v;
  },
  { immediate: true }
);

const removeSelection = (index) => {
  fieldValue.value.splice(index, 1);
};
</script>

<template>
  <div>
    <v-combobox
      v-model="fieldValue"
      v-bind="{ ...$attrs, ...options }"
      :error-messages="field.errorMessage.value"
      v-on="events"
      @click="() => events && events.hasOwnProperty('onClick') && events.onClick()"
      @change="onSelect"
    >
      <template #selection="{ item, index }">
        <v-chip
          v-if="item === Object(item)"
          :color="
            options.items.some((o) => JSON.stringify(o) === JSON.stringify(item.raw))
              ? 'primary'
              : 'dark'
          "
          :text="item.title"
          size="small"
          closable
          @click:close="removeSelection(index)"
        />
      </template>

      <template #append>
        <slot name="append" />
      </template>
    </v-combobox>
  </div>
</template>
