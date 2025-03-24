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
            type: "selects",
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
          budget: {
            options: {
              label: "Budget 💸",
              "persistent-hint": true,
            },
            // validation: "required",

            conditionals: [
              {
                name: "Bob",
                deadline: "now",
              },
              {
                name: "John",
              },
            ],
          },
        },
      ],
    },
    {
      conditionals: [
        {
          deadline: "normal_client",
        },
      ],
      title: "In 1 - 2 Months",
      input: [
        {
          comments: {
            type: "textArea",
            options: {
              label: "Tell us your thoughts, Delivery: (In 1 - 2 Months)",
            },
          },
        },
      ],
    },
    {
      conditionals: [
        {
          deadline: "now",
        },
      ],
      title: "Let me see the money!",
      input: [
        {
          comments: {
            type: "textArea",
            options: {
              label: "Tell us your thoughts, Delivery: (Now!)",
            },
          },
        },
      ],
    },
    {
      conditionals: [
        {
          deadline: "yesterday",
        },
      ],
      title: "Impossible!!!",
      input: [
        {
          comments: {
            type: "textArea",
            options: {
              label: "Tell us your thoughts, Delivery: (In 1 - 2 Months)",
            },
          },
        },
      ],
    },
  ],
  submit: {
    title: "Send Message",
    color: "primary",
    click(data) {
      console.log("data: ", data);
    },
  },
};
</script>

<template>
  <p>
    To show the Budget 💸 field, we should provide the name with <b>Bob</b>, or
    <b>John</b>, if the name is bob we need to provide the deadline with <b>Now!</b> value
  </p>
  <dataForm id="conditionals" :api="api" />
</template>
