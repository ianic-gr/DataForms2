<script setup>
const result = ref(null);

const api = {
  rows: [
    {
      input: [
        {
          password: {
            type: "numberInput",
            options: {
              label: "Number",
            },
          },
        },
      ],
    },
  ],
  submit: {
    options: {
      text: "Submit",
      color: "primary",
    },
    click: (formData) => {
      console.log("FormData: ", formData);
      result.value = JSON.parse(JSON.stringify(formData));
    },
  },
};
</script>

<template>
  <DataForm id="checks-radios" :api="api" />
  <div v-if="result" class="mt-4">
    <h3>Result:</h3>
    {{ result }}
  </div>
</template>
