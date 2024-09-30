<script setup>
const api = {
  rows: [
    {
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
    {
      input: [
        {
          deadline: {
            type: "numberInput",
            options: {
              label: "When do you need this project?",
              default: "normal_client",
              items: [
                {
                  text: "In 1 - 2 Months",
                  value: "normal_client",
                },
                {
                  text: "Now!",
                  value: "now",
                },
                {
                  text: "Yesterday!!!",
                  value: "yesterday",
                },
              ],
            },
          },
        },
      ],
    },
    {
      input: [
        {
          comments: {
            type: "textArea",
            options: {
              label: "Tell us your thoughts",
            },
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
