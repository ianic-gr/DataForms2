<script setup>
import { useFieldType } from "@/composables/useFieldType";
import { useInputEvents } from "@/composables/useInputEvents";
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
  loadingIndicator: {
    type: Boolean,
    default: false,
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
const $useInputEvents = useInputEvents(props);

const fieldReturn = defineModel("return");

watch(
  fieldValue,
  (v) => {
    if (v === null) return;

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
      :loading="props.loadingIndicator"
      :error-messages="field.errorMessage.value"
      v-on="props.events"
      @click="() => events && events.hasOwnProperty('onClick') && events.onClick()"
    >
      <template v-if="$slots.append" #append>
        <slot name="append" />
      </template>
    </v-file-input>
    <Slider
      v-if="Array.isArray(props.options.preview)"
      :options="props.options"
      @delete-item="$useInputEvents.onDelete"
    />
    <Single v-else :options="props.options" @delete-item="$useInputEvents.onDelete" />
  </div>
</template>
