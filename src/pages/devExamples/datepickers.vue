<script setup>
import { useDate } from "vuetify";

const adapter = useDate();
const result = ref(null);

const api = {
  rows: [
    {
      input: [
        {
          deadline: {
            type: "datepicker",
            options: {
              label: "When do you need this project?",
              prependIcon: "mdi-calendar",
              default: "07-02-1993",
              format: "DD/MM/YYYY",
              returnFormat: "MM-DD-YYYY",
              datepicker: {
                allowedDates: (val) => {
                  return parseInt(adapter.toISO(val).split("-")[2], 10) % 2 === 0;
                },
              },
            },
          },
        },
        {
          reminder: {
            type: "dateTimePicker",
            options: {
              label: "When should we call you?",
              prependIcon: "mdi-calendar-clock",
              default: "07/02/1993 06:00:00",
              format: "DD/MM/YYYY H:mm:ss",
              returnFormat: "MM-DD-YYYY h:mm:ss",
              datepicker: {
                allowedDates: (val) => {
                  return parseInt(adapter.toISO(val).split("-")[2], 10) % 2 === 0;
                },
              },
              timepicker: {
                allowedHours: (v) => v % 2,
                allowedMinutes: (v) => v >= 10 && v <= 50,
                allowedStep: (m) => m % 10 === 0,
              },
            },
          },
        },
        {
          multiple: {
            type: "datepicker",
            options: {
              label: "Datepicker Multiple Values",
              prependIcon: "mdi-calendar-multiselect",
              default: ["07-02-1993"],
              format: "DD/MM/YYYY",
              returnFormat: "MM-DD-YYYY",
              datepicker: {
                multiple: true,
              },
            },
          },
        },
        {
          range: {
            type: "datepicker",
            options: {
              label: "Datepicker Range",
              prependIcon: "mdi-calendar-range",
              default: ["07-02-1993"],
              format: "DD/MM/YYYY",
              returnFormat: "MM-DD-YYYY",
              datepicker: {
                multiple: "range",
              },
            },
          },
        },
      ],
    },
  ],
  submit: {
    title: "Submit",
    color: "primary",
    click: (formData) => {
      console.log("FormData: ", formData);
      result.value = JSON.parse(JSON.stringify(formData));
    },
  },
};
</script>

<template>
  <DataForm id="datepicker" :api="api" />
  <div v-if="result" class="mt-4">
    <h3>Result:</h3>
    {{ result }}
  </div>
</template>
