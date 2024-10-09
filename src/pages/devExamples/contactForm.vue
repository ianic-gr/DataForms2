DataForms2 DataForms2 is a powerful Vue 3 plugin designed to simplify the
creation of dynamic forms using Vuetify 3 components. It provides a flexible API
for defining form structures, validation rules, and submission handling, making
it easy to implement complex forms in your Vue applications. Installation You
can install DataForms2 via npm: bash Copy code npm install @ianicdev/dataforms2
Nuxt.js Integration To integrate DataForms2 into your Nuxt.js project, create a
plugin file named dataforms.js in the plugins directory: javascript Copy code
import DataForms from "@ianicdev/dataforms2"; import
"@ianicdev/dataforms2/styles.css"; export default defineNuxtPlugin((nuxtApp) =>
{ nuxtApp.vueApp.use(DataForms); }); Usage Once installed, you can use the
DataForm component in your Vue components. Below is an example of how to create
a contact form using the DataForms2 plugin. Contact Form Example vue Copy code
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
              clearable: true,
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
            type: "selects",
            options: {
              label: "When do you need this project?",
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
            validation: "required",
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
            validation: "required",
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
API Structure rows: An array of form sections, each containing an array of input
fields. input: Defines the individual input fields, their options, and
validation rules. submit: Configuration for the submit button, including title,
color, options, icon, and click handler. Options label: The label for the input
field. prependIcon: An icon displayed before the input field. validation:
Validation rules for the field, supporting required, min, max, and email checks.
tooltip: Optional tooltip with text and position. Contributing Contributions are
welcome! Please feel free to submit a pull request or open an issue for any bugs
or feature requests. License This project is licensed under the MIT License. See
the LICENSE file for details.
