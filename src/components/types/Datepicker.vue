<script setup>
import { useDateTimeFieldType } from "@/composables/useDateTimeFieldType";
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
const { field, currentFormData, tempDate, date, formattedDate } =
  useDateTimeFieldType(props);

const dialog = ref(false);

const saveDate = () => {
  field.value = tempDate.value;
  dialog.value = false;
};

const fieldReturn = defineModel("return");

watch(
  formattedDate,
  (v) => {
    if (v === null) return;

    inputField.value.value = v;
    fieldReturn.value = v;
  },
  { immediate: true }
);
</script>

<template>
  <v-dialog v-model="dialog" max-width="360" persistent>
    <template v-slot:activator="{ props: activatorProps }">
      <div>
        <v-text-field
          v-model="formattedDate"
          v-bind="{ ...$attrs, ...activatorProps, ...options }"
          @click="events?.onClick && events.onClick()"
          readonly
          outlined
          :error-messages="inputField.errorMessage.value"
        />
      </div>
    </template>
    <template v-slot:default>
      <v-card>
        <v-card-text class="pa-0">
          <v-date-picker
            v-model="date"
            v-bind="options?.datepicker"
            :locale="currentFormData?.locale"
            width="auto"
          />
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
