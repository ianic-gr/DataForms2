<script setup>
const api = {
  rows: [
    {
      theme: "Fluid",
      title: "Contact Form",
      input: [
        {
          name: {
            options: {
              label: "First name",
              prependIcon: "mdi-account",
              "persistent-hint": true,
            },
            validation: "required",
          },
          email: {
            options: {
              default: "support@ianic.gr",
              label: "Email",
              prependIcon: "mdi-mail",
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
              prependIcon: "mdi-account",
            },
          },
          phone: {
            options: {
              label: "Phone",
              prependIcon: "mdi-phone",
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
    options: {
      text: "Message",
      rounded: true,
      color: "primary",
      prependIcon: "mdi-heart",
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
