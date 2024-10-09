<script setup>
const result = ref(null);

const api = {
  rows: [
    {
      input: [
        {
          password: {
            type: "password",
            options: {
              label: "Password",
            },
            validation: "min:6|required|max:18",
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
  <DataForm id="checks-radios" :api="api" />
  <div v-if="result" class="mt-4">
    <h3>Result:</h3>
    {{ result }}
  </div>
</template>
