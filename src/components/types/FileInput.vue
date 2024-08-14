<template>
  <div class="type-fileinput">
    <v-file-input
        v-bind="{ ...$attrs, ...options }"
        v-model="field"
        :loading="props.loadingIndicator"
        v-on="props.events"
        outlined
        @click="() => events && events.hasOwnProperty('onClick') && events.onClick()"
    >
      <template v-slot:append><slot name="append"></slot></template>
    </v-file-input>
    <Slider
      v-if="Array.isArray(props.options.preview)"
      :options="props.options"
      @deleteItem="$useInputEvents.onDelete"
    />
    <Single v-else :options="props.options" @deleteItem="$useInputEvents.onDelete"/>
  </div>
</template>

<script setup>
import {useFieldType} from "@/composables/useFieldType";
import {useInputEvents} from "@/composables/useInputEvents";

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
})

const { field } = useFieldType(props);
const $useInputEvents = useInputEvents(props)
</script>
