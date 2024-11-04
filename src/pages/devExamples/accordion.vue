<script setup>
const api = {
  rows: [
    {
      accordion: {
        options: {},
        items: [
          {
            title: "Personal Info",
            inputGroups: [
              {
                title: "Customer Input Group",
                options: {
                  color: "primary",
                  variant: "tonal",
                },
                input: [
                  {
                    cname: {
                      options: {
                        label: "First name",
                      },
                      validation: "required",
                    },
                    _responsive: {
                      sm: 12,
                    },
                  },
                  {
                    csurname: {
                      options: {
                        label: "Last name",
                      },
                      validation: "required",
                    },
                    _responsive: {
                      sm: 12,
                    },
                  },
                ],
              },
            ],
            input: [
              {
                name: {
                  options: {
                    label: "First name",
                    hint: "Είσαι ο;",
                    "persistent-hint": true,
                  },
                  validation: "required",
                },
                surname: {
                  options: {
                    label: "Last name",
                    hint: "Είσαι ο;",
                    "persistent-hint": true,
                  },
                  validation: "required",
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
                  validation: "required",
                },
                expenses: {
                  options: {
                    label: "Expenses",
                    "persistent-hint": true,
                  },
                  validation: "required",
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
                  validation: "required",
                },
                expensesx: {
                  options: {
                    label: "Expenses",
                    "persistent-hint": true,
                  },
                  validation: "required",
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
