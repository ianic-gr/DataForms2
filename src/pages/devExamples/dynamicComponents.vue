<script setup>
import Alias from "@/components/examples/dynamic/alias/index.vue";
import Map from "@/components/examples/dynamic/Map.vue";

const api = {
  rows: [
    {
      input: [
        {
          pop: {
            type: "dynamic",
            options: {
              label: "hello",
              default: {
                el: "",
                en: "",
              },
            },
            validation: "required",
            component: Alias,
          },

          whereAMI: {
            options: {
              label: "Where am i?",
              "persistent-hint": true,
            },
            validation: "required",
          },
        },
      ],
      dynamic: {
        component: Map,
        fields: [
          {
            latitude: {
              options: {
                label: "Latitude",
                default: "40.634929113599355",
                "persistent-hint": true,
              },
              validation: "required",
            },
            _responsive: {
              sm: 12,
              md: 6,
            },
          },
          {
            longitude: {
              options: {
                label: "Longitude",
                default: "22.909068872420296",
                "persistent-hint": true,
              },
              validation: "required",
            },
            _responsive: {
              sm: 12,
              md: 6,
            },
          },
        ],
      },
    },
  ],
  submit: {
    title: "Save",
    color: "primary",
    click(data) {
      console.log("data: ", data);
    },
  },
};
</script>

<template>
  <DataForm id="dynamic-components-form" :api="api" />
</template>
