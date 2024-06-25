<script setup>
import { useConditionals } from "@/composables/useConditionals.js";

// Components
import textField from "../../types/TextField";
import textArea from "../../types/TextArea";
// import radioButtons from "@/types/RadioButtons";
import selects from "../../types/Selects";
// import selectsAutocomplete from "@/types/SelectsAutocomplete";
// import checkBoxes from "@/types/CheckBoxes";
// import fileInput from "@/types/FileInput";
// import datepicker from "@/types/Datepicker";
// import customDatePicker from "@/types/CustomDatepicker";
// import dateTimePicker from "@/types/DateTimePicker";
// import password from "@/types/Password";
import epic from "../../types/Epic";

const types = {
  textField,
  textArea,
  selects,
  epic,
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
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const { showOnConditions } = useConditionals(props.formId);

const hasLabelTitle = computed(() => {
  return props.theme === "Fluid" && label.value;
});

const label = computed(() => {
  return props.input?.options?.label;
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

const tooltipAttributes = computed(() => {
  const tooltipObject = props.input.tooltip;
  const tooltipAttributes = {};

  const position = tooltipObject.position || "top";

  tooltipAttributes[position] = position;

  return tooltipAttributes;
});

const isRequired = computed(() => {
  return props.input?.validation?.required;
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
        <span v-if="isRequired" class="red--text">*</span>
      </div>

      <div class="flex-grow-1" style="max-width: 100%">
        <label v-if="theme === 'Breeze'" class="text-uppercase">
          {{ label }}
          <span v-if="isRequired(input)" class="red--text">*</span>
        </label>
        <component :is="'TextField'"></component>
        <component
          :is="types[input.type] || textField"
          :input="input"
          :formId="formId"
          :inputKey="inputKey"
          :options="{
            dense: theme === 'Fluid',
            solo: theme === 'Fluid',
            flat: theme === 'Fluid',

            ...input.options,
            label: inputLabel,
          }"
          :events="input.events"
          :name="inputKey"
          :disabled="loading"
          :loadingIndicator="loading"
          :theme="theme"
        >
          <template
            v-for="inputSlot in input.itemSlots"
            #[inputSlot]="{ item }"
          >
            <slot :name="inputSlot" :item="item" />
          </template>
          <template v-slot:append v-if="input.tooltip">
            <div
              class="text-center d-flex align-center justify-space-around"
              style="cursor: pointer"
            >
              <v-tooltip v-bind="tooltipAttributes">
                <template v-slot:activator="{ on, attrs }">
                  <div v-bind="attrs" v-on="on ?? {}">
                    <v-icon color="primary">mdi-information</v-icon>
                  </div>
                </template>
                <span>{{ input.tooltip.text }}</span>
              </v-tooltip>
            </div>
          </template>
          <template v-slot:append v-else-if="input.appendInner">
            <div
              class="text-center d-flex align-center justify-space-around"
              style="cursor: pointer"
            >
              <component
                @click="input.appendInner.onClick"
                :is="input.appendInner.component"
                v-bind="input.appendInner.options"
              >
                {{ input.appendInner.text }}
              </component>
            </div>
          </template>
          <template v-slot:append-outer v-if="input.appendOuter">
            <div
              class="text-center d-flex align-center justify-space-around"
              style="cursor: pointer"
            ></div>
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
