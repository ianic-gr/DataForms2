<script setup>
const api = {
  rows: [
    {
      theme: 'Fluid',
      title: 'Contact Form',
      input: [
        {
          name: {
            options: {
              label: "First name",
              prependIcon: "mdi-account",
              "persistent-hint": true,
            },
            validation: {
              required: true,
            },
          },
          email: {
            options: {
              default: "support@ianic.gr",
              label: "Email",
              prependIcon: "mdi-mail",
            },
            validation: {
              required: true,
              min: 4,
              max: 24,
              type: "email",
              _callback: () => {
                return {
                  validate: (value) => {
                    console.log(value);
                    return true;
                  },
                  message: "{_field_} is not valid(?)",
                };
              },
            },
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
            validation: {
              required: true,
            },
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
