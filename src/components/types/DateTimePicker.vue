<script setup>
import moment from "moment";
import { useDateTimeFieldType } from "@/composables/useDateTimeFieldType";
import { VTimePicker } from "vuetify/labs/VTimePicker";
import { useField } from "vee-validate";

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

const inputField = useField(
  props.inputKey,
  !props.input.readOnly ? props.input.validation : ""
);
const {
  field,
  currentFormData,
  date,
  time,
  formattedDateTime,
  defaultDateFormat,
  defaultTimeFormat,
} = useDateTimeFieldType(props);

const dialog = ref(false);
const pickerTab = ref("date");

const saveDate = () => {
  const format =
    props.options?.returnFormat ?? `${defaultDateFormat} ${defaultTimeFormat}`;
  const extractedDate = moment(date.value).format(defaultDateFormat);

  field.value = moment(`${extractedDate} ${time.value}`).format(format);
  dialog.value = false;
};

watch(formattedDateTime, (v) => {
  inputField.value.value = v;
});

const fieldReturn = defineModel("return");

watch(
  field,
  (v) => {
    if (v === null) return;

    inputField.value.value = formattedDateTime.value;
    fieldReturn.value = formattedDateTime.value;
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <v-text-field
      v-model="formattedDateTime"
      v-bind="{ ...$attrs, ...options }"
      readonly
      :error-messages="inputField.errorMessage.value"
      @click:clear="date = null"
      @click="events?.onClick && events.onClick()"
    />
    <v-dialog v-model="dialog" max-width="360" persistent activator="parent">
      <template #default>
        <v-card>
          <v-card-text class="pa-0">
            <v-tabs v-model="pickerTab" dark grow>
              <v-tab value="date"> DATE </v-tab>
              <v-tab value="time"> TIME </v-tab>
            </v-tabs>
            <v-tabs-window v-model="pickerTab">
              <v-tabs-window-item value="date">
                <v-date-picker
                  v-model="date"
                  v-bind="options?.datepicker"
                  :locale="currentFormData?.locale"
                  :multiple="false"
                  width="auto"
                />
              </v-tabs-window-item>
              <v-tabs-window-item value="time">
                <v-time-picker v-model="time" width="auto" />
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
          <v-spacer />
          <v-card-actions>
            <v-btn text color="primary" @click="dialog = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="saveDate"> OK </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
