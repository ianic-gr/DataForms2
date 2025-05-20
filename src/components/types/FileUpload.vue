<script setup>
import { useFieldType } from "@/composables/useFieldType";
import { useInputEvents } from "@/composables/useInputEvents";
import { useField } from "vee-validate";
import { VFileUpload } from "vuetify/labs/VFileUpload";

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

const fileInputDensity = computed(() => {
  const preview = Array.isArray(props.options.preview)
    ? props.options.preview.length
    : props.options.preview;
  const field = Array.isArray(fieldValue.value)
    ? fieldValue.value.length
    : fieldValue.value;

  return preview || field ? "compact" : "default";
});

watch(
  fieldValue,
  (v) => {
    if (v === null && !fieldReturn.value) return;

    field.value.value = v;
    fieldReturn.value = (Array.isArray(v) ? v : [v]).map((item) => item.name).join(", ");
  },
  { immediate: true }
);
</script>

<template>
  <div class="df2-file-upload">
    <v-card variant="tonal">
      <v-card-text>
        <v-file-upload
          v-model="fieldValue"
          clearable
          show-size
          v-bind="{ ...$attrs, ...options }"
          :density="fileInputDensity"
          :variant="fileInputDensity"
          :loading="props.loadingIndicator"
          :error-messages="field.errorMessage.value"
          v-on="props.events"
          @click="() => events && events.hasOwnProperty('onClick') && events.onClick()"
        >
          <template
            v-for="(inputSlot, inputSlotKey) in input.itemSlots"
            :key="inputSlotKey"
            #[inputSlot.slot]="slotProps"
          >
            <slot :name="inputSlot.template" v-bind="slotProps" />
          </template>
        </v-file-upload>
      </v-card-text>
    </v-card>

    <Slider
      v-if="Array.isArray(props.options.preview)"
      :options="props.options"
      @delete-item="$useInputEvents.onDelete"
    />
    <Single v-else :options="props.options" @delete-item="$useInputEvents.onDelete" />
  </div>
</template>

<style lang="scss">
.df2-file-upload {
  .v-file-upload-items {
    margin-bottom: 0;
  }

  .v-file-upload {
    padding: 24px !important;

    .v-file-upload-divider {
      margin: 1rem !important;
    }
    .v-file-upload-icon {
      font-size: 2rem !important;
      opacity: unset !important;
    }

    .v-btn {
      --v-theme-overlay-multiplier: var(--v-theme-primary-overlay-multiplier);
      background-color: rgb(var(--v-theme-primary)) !important;
      color: rgb(var(--v-theme-on-primary)) !important;

      &.v-btn--size-large {
        --v-btn-size: 0.75rem;
        --v-btn-height: 28px;
        font-size: var(--v-btn-size);
        min-width: 50px;
        padding: 0 12px;
      }
    }
  }
}
</style>
