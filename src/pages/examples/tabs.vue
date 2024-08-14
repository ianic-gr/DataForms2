<script setup>
const api = {
  rows: [
    {
      tabs: {
        options: {
          header: "Checkout",
          toolbar: {},
          color: "cyan",
        },
        items: [
          {
            title: "Personal information",
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
                _responsive: {
                  sm: 12,
                },
              },
              {
                surname: {
                  options: {
                    label: "Last name",
                    hint: "Είσαι ο;",
                    "persistent-hint": true,
                  },
                  validation: "required",
                },
                _responsive: {
                  sm: 12,
                },
              },
            ],
          },
          {
            title: "Billing details",
            input: [
              {
                Address: {
                  options: {
                    label: "Last name",
                  },
                  validation: "required",
                },
                phone: {
                  options: {
                    label: "Phone",
                  },
                  validation: "required",
                  tooltip: {
                    text: "lorem ipsun",
                  },
                },
              },
            ],
          },
          {
            title: "Payment Method",
            input: [
              {
                payment: {
                  type: "radioButtons",
                  options: {
                    title: "Available Payment Methods",
                    label: "Pay us with: ",
                    default: "",
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
                  validation: "required",
                },
                _responsive: {
                  sm: 12,
                },
              },
            ],
          },
        ],
      },
    },
  ],
  submit: {
    title: "Place order",
    color: "primary",
    click: (formData) => {
      console.log("FormData: ", formData);
      this.result = JSON.parse(JSON.stringify(formData));
    },
  },
};
</script>

<template>
  <DataForm id="tabs_example" :api="api" />
</template>
