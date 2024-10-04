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
  name: {
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
const field = useField(props.inputKey);
const $useInputEvents = useInputEvents(props);

watch(fieldValue, (v) => {
  console.log(v);
  field.value.value = v;
});
</script>

<template>
  <div class="type-fileinput">
    <v-file-input
      v-model="fieldValue"
      v-bind="{ ...$attrs, ...options }"
      :loading="props.loadingIndicator"
      v-on="props.events"
      @click="
        () => events && events.hasOwnProperty('onClick') && events.onClick()
      "
      :error-messages="field.errorMessage.value"
    >
      <template v-slot:append><slot name="append"></slot></template>
    </v-file-input>
    <Slider
      v-if="Array.isArray(props.options.preview)"
      :options="props.options"
      @deleteItem="$useInputEvents.onDelete"
    />
    <Single
      v-else
      :options="props.options"
      @deleteItem="$useInputEvents.onDelete"
    />
  </div>
</template>
