<script setup>
import moment from "moment";
import { useFieldType } from "@/composables/useFieldType";

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
  name: {
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

const { field, getCurrentFormData } = useFieldType(props);

const dialog = ref(false);
const tempDate = ref(null);
const defaultFormat = "YYYY-MM-DD";

const date = computed({
  get: () => {
    const format = props.options?.returnFormat ?? defaultFormat;

    return new Date(moment(tempDate.value ?? field.value, format).format());
  },
  set: (v) => {
    const format = props.options?.returnFormat ?? defaultFormat;

    tempDate.value = moment(v).format(format);
  },
});

const formattedDate = computed(() => {
  const format = props.options?.format ?? defaultFormat;
  const fDate = field.value ? moment(date.value).format(format) : "";

  return fDate;
});

const datepickerOptions = computed(() => {
  return props.options?.datepicker;
});

const locale = computed(() => {
  return getCurrentFormData?.locale;
});

const save = () => {
  field.value = tempDate.value;
  dialog.value = false;
};
</script>

<template>
  <v-dialog v-model="dialog" max-width="360" persistent>
    <template v-slot:activator="{ props: activatorProps }">
      <v-text-field
        v-model="formattedDate"
        v-bind="{ ...$attrs, ...activatorProps, ...options }"
        @click="
          () => events && events.hasOwnProperty('onClick') && events.onClick()
        "
        readonly
        outlined
      />
    </template>
    <template v-slot:default>
      <v-card>
        <v-card-text class="pa-0">
          <v-date-picker
            v-model="date"
            v-bind="datepickerOptions"
            :locale="locale"
            width="auto"
          >
          </v-date-picker>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn text color="primary" @click="dialog = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="save"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
