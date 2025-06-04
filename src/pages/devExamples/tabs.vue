<script setup>
import Map from "@/components/examples/dynamic/Map.vue";

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
          {
            title: "Map",
            input: [
              {
                pop: {
                  options: {
                    label: "Pop",
                  },
                  validation: "required|max:2",
                },
                _responsive: {
                  sm: 12,
                },
              },
            ],
            dynamic: {
              component: Map,
              fields: [
                {
                  pop: {
                    options: {
                      label: "Pop",
                    },
                    validation: "required",
                  },
                },
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
      },
    },
  ],
  submit: {
    options: {
      text: "Place order",
      color: "primary",
    },
    click: (formData) => {
      console.log("FormData: ", formData);
    },
  },
};
</script>

<template>
  <DataForm id="tabs_example" :api="api" />
</template>
