<script setup>
const result = ref(null);

const api = {
  rows: [
    {
      title: "Available Payment Methods",
      input: [
        {
          isThisOk: {
            type: "switchButton",
            options: {
              label: "Is this OK?",
              indeterminate: true,
              inset: true,
            },
          },
        },
        {
          payment: {
            type: "radioButtons",
            options: {
              label: "Pay us with: ",
              list: [
                {
                  label: "Visa",
                  value: "visa",
                },
                {
                  label: "Paypal",
                  value: "paypal",
                },
                {
                  label: "Stripe",
                  value: "stripe",
                },
              ],
            },
          },
        },
        {
          terms: {
            type: "checkBoxes",
            options: {
              label: "Terms & conditions",
              items: [
                {
                  label: "I aggree to steal all my data!",
                  value: "steal",
                },
                {
                  label: "I aggree to not steal all my data!",
                  value: "dont_steal",
                },
              ],
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
