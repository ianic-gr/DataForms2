<script setup>
const api = {
  rows: [
    {
      accordion: {
        options: {},
        items: [
          {
            title: "Personal Info",
            input: [
              {
                name: {
                  options: {
                    label: "First name",
                    hint: "Είσαι ο;",
                    "persistent-hint": true,
                  },
                  validation: {
                    required: true,
                  },
                },
                surname: {
                  options: {
                    label: "Last name",
                    hint: "Είσαι ο;",
                    "persistent-hint": true,
                  },
                  validation: {
                    required: true,
                  },
                },
              },
            ],
          },
          {
            title: "Budget",
            input: [
              {
                target: {
                  options: {
                    label: "Target",
                    "persistent-hint": true,
                  },
                  validation: {
                    required: true,
                  },
                },
                expenses: {
                  options: {
                    label: "Expenses",
                    "persistent-hint": true,
                  },
                  validation: {
                    required: true,
                  },
                },
              },
            ],
          },
          {
            title: "Budgetx",
            input: [
              {
                targetx: {
                  options: {
                    label: "Target",
                    "persistent-hint": true,
                  },
                  validation: {
                    required: true,
                  },
                },
                expensesx: {
                  options: {
                    label: "Expenses",
                    "persistent-hint": true,
                  },
                  validation: {
                    required: true,
                  },
                },
              },
            ],
          },
        ],
      },
    },
  ],
  submit: {
    title: "Send Message",
    color: "primary",
    click: (formData) => {
      console.log("FormData: ", formData);
      alert("Accordion ok!");
    },
  },
};
</script>

<template>
  <DataForm id="accordion_example" :api="api" />
</template>
