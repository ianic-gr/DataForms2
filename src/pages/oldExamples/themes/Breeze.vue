<script setup>
const api = {
  rows: [
    {
      theme: "Breeze",
      title: "Contact Form",
      input: [
        {
          name: {
            options: {
              label: "First name",
            },
            validation: "required",
          },
          email: {
            options: {
              default: "support@ianic.gr",
              label: "Email",
            },
            validation: "required|min:4|max:24|email",
            tooltip: {
              position: "bottom",
              text: "lorem ipsun",
            },
          },
          _responsive: {
            sm: 12,
            md: 6,
          },
        },
        {
          surname: {
            options: {
              label: "Last name",
            },
          },
          phone: {
            options: {
              label: "Phone",
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
  ],
  submit: {
    title: "Message",
    color: "primary",
    options: {
      rounded: true,
    },
    icon: {
      symbol: "mdi-heart",
      options: {
        small: true,
        color: "red",
        class: "mr-2",
      },
    },
    click(data) {
      console.log("data: ", data);
    },
  },
};
</script>

<template>
  <DataForm id="contact-form" :api="api" />
</template>
