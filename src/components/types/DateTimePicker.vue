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

const inputField = useField(props.inputKey);
const {
  field,
  getCurrentFormData,
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

  console.log(format, extractedDate, time.value);

  field.value = moment(`${extractedDate} ${time.value}`).format(format);
  dialog.value = false;
};

watch(formattedDateTime, (v) => {
  inputField.value.value = v;
});
</script>

<template>
  <v-dialog v-model="dialog" max-width="360" persistent>
    <template v-slot:activator="{ props: activatorProps }">
      <div
        :class="`dataforms-field dataforms-dateTimePicker--${formId}_${inputKey} dataforms-dateTimePicker--${formId} dataforms-dateTimePicker--${inputKey}`"
      >
        <v-text-field
          v-model="formattedDateTime"
          v-bind="{ ...$attrs, ...activatorProps, ...options }"
          @click="events?.onClick && events.onClick()"
          readonly
          :error-messages="inputField.errorMessage.value"
        />
      </div>
    </template>
    <template v-slot:default>
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
                :locale="getCurrentFormData?.locale"
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
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text color="primary" @click="saveDate">OK</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
