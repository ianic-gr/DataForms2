<script setup>
import { useConditionals } from "@/composables/useConditionals.js";
import { normalizeString } from "@/utils/normalizeString";

// Components
import textField from "@/components/types/TextField";
import textArea from "@/components/types/TextArea";
import radioButtons from "@/components/types/RadioButtons";
import selects from "@/components/types/Selects";
// import selectsAutocomplete from "@/components/types/SelectsAutocomplete";
import switchButton from "@/components/types/Switch";
import checkBoxes from "@/components/types/CheckBoxes";
import numberInput from "@/components/types/NumberInput";
import datepicker from "@/components/types/Datepicker";
import dateTimePicker from "@/components/types/DateTimePicker";
import password from "@/components/types/Password";
import epic from "@/components/types/Epic";
import fileInput from "@/components/types/FileInput.vue";
import dynamic from "@/components/types/dynamic.vue";

const types = {
  textField,
  textArea,
  radioButtons,
  selects,
  switchButton,
  checkBoxes,
  numberInput,
  datepicker,
  dateTimePicker,
  password,
  epic,
  fileInput,
  dynamic,
};

const props = defineProps({
  input: {
    type: Object,
    required: true,
  },
  inputKey: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
  formId: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const { showOnConditions } = useConditionals(props.formId);

const fieldReturn = ref();

const hasLabelTitle = computed(() => {
  return props.theme === "Fluid" && label.value;
});

const isRequired = computed(() => {
  const validation = props.input?.validation;

  return (
    typeof validation === "string" &&
    validation?.includes("required") &&
    !props.input?.readOnly
  );
});

const label = computed(() => {
  const decorator = props.theme === "Plain" && isRequired.value ? " *" : "";

  return `${props.input?.options?.label}${decorator}`;
});

const inputLabel = computed(() => {
  let _label = label.value;

  if (props.theme === "Fluid") {
    const checkType =
      typeof props.input.type === "undefined" ||
      props.input.type === "textField" ||
      props.input.type === "textArea" ||
      props.input.type === "checkBoxes" ||
      props.input.type === "selects" ||
      props.input.type === "selectsAutocomplete";

    if (checkType) {
      _label = "---";
    }
  }

  if (props.theme === "Breeze") {
    _label = "";
  }

  return _label;
});

const themeOptions = computed(() => {
  let variant = "filled";
  let density = "default";
  let singleLine = false;
  const color = "primary";

  if (props.theme === "Fluid" || props.theme === "Breeze") {
    variant = "outlined";
  }

  if (props.theme === "Fluid") {
    density = "compact";
    singleLine = true;
  }

  return {
    variant,
    density,
    singleLine,
    color,
    theme: props.theme,
  };
});

const inputTypeComponent = computed(() => {
  const selectedInputType =
    Object.entries(types).find(
      ([key]) => normalizeString(key) === normalizeString(props.input?.type ?? "")
    )?.[1] ?? textField;

  return selectedInputType;
});
</script>

<template>
  <v-row v-if="showOnConditions(input.conditionals)">
    <v-col v-if="hasLabelTitle" class="mt-2" style="max-width: 165px">
      <v-label
        :style="
          theme === 'Fluid'
            ? 'font-size: 0.8125rem;font-weight: 500;text-wrap: wrap'
            : 'text-wrap: wrap'
        "
      >
        {{ label }}
      </v-label>
    </v-col>
    <v-col class="d-flex align-start input-field">
      <div v-if="theme === 'Fluid'" style="min-width: 10px">
        <span v-if="isRequired" class="text-error">*</span>
      </div>

      <div class="flex-grow-1" style="max-width: 100%">
        <label v-if="theme === 'Breeze'" class="text-uppercase">
          {{ label }}
          <span v-if="isRequired" class="text-error">*</span>
        </label>

        <div v-if="input.readOnly" class="d-flex align-center">
          <v-icon v-if="input.options?.prependIcon" class="me-4">
            {{ input.options?.prependIcon }}
          </v-icon>
          <v-card class="w-100" variant="tonal" min-height="59">
            <v-card-text class="py-2">
              <div>
                <small>{{ input?.options?.label }}</small>
                <p>{{ fieldReturn ?? "-" }}</p>
              </div>
            </v-card-text>
          </v-card>
        </div>

        <component
          :is="inputTypeComponent"
          v-show="!input.readOnly"
          v-model:return="fieldReturn"
          :class="`dataforms-field dataforms-${inputTypeComponent.__name}--${formId}_${inputKey} dataforms-${inputTypeComponent.__name}--${formId} dataforms-${inputTypeComponent.__name}--${inputKey}`"
          :input="input"
          :form-id="formId"
          :input-key="inputKey"
          :options="{
            ...themeOptions,
            ...input.options,
            label: inputLabel,
          }"
          :events="input.events"
          :disabled="loading"
          :loading-indicator="loading"
        >
          <template v-for="inputSlot in input.itemSlots" #[inputSlot]="{ item }">
            <slot :name="inputSlot" :item="item" />
          </template>
          <template v-if="input.tooltip" #append>
            <div
              class="text-center d-flex align-center justify-space-around"
              style="cursor: pointer"
            >
              <v-tooltip v-bind="input.tooltip">
                <template #activator="{ props }">
                  <div v-bind="props">
                    <v-icon color="primary"> mdi-information </v-icon>
                  </div>
                </template>
              </v-tooltip>
            </div>
          </template>
          <template v-else-if="input.appendInner" #append>
            <div
              class="text-center d-flex align-center justify-space-around"
              style="cursor: pointer"
            >
              <component
                :is="input.appendInner.component"
                v-bind="input.appendInner.options"
                @click="input.appendInner.onClick"
              >
                {{ input.appendInner.text }}
              </component>
            </div>
          </template>
          <template v-if="input.appendOuter" #append-outer>
            <div
              class="text-center d-flex align-center justify-space-around"
              style="cursor: pointer"
            />
            <component
              :is="input.appendOuter.component"
              v-bind="input.appendOuter.options"
            >
              {{ input.appendOuter.text }}
            </component>
          </template>
        </component>
      </div>
    </v-col>
  </v-row>
</template>
