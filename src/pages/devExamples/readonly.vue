<script setup>
const api = {
  rows: [
    {
      input: [
        {
          name: {
            readOnly: true,
            options: {
              default: "Support",
              label: "First name",
              prependIcon: "mdi-account",
              "persistent-hint": true,
            },
            validation: "required",
          },
          email: {
            readOnly: true,
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
            readOnly: true,
            options: {
              label: "Last name",
              default: "Ianic",
              prependIcon: "mdi-account",
            },
          },
          phone: {
            readOnly: true,
            options: {
              label: "Phone",
              default: "0123456789",
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
      text: "Save",
      color: "primary",
    },
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
  <dataForm id="readonly" :api="api" :options="{ submitReadonlyFields: false }" />
</template>
