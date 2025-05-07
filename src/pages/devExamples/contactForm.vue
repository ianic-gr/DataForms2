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
              clearable: true,
            },
            validation: "required",
          },
          email: {
            options: {
              default: "support@ianic.gr",
              label: "Email",
              prependIcon: "mdi-mail",
              "persistent-hint": true,
              hint: "This is a readOnly Field",
            },
            validation: "required|min:4|max:24|email",
            readOnly: true,
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
            type: "autocomplete",
            options: {
              label: "When do you need this project?",
              default: [
                {
                  title: "In 1 - 2 Months",
                  value: "normal_client",
                },
                {
                  title: "Now!",
                  value: "now",
                },
              ],
              items: [
                {
                  title: "In 1 - 2 Months",
                  value: "normal_client",
                },
                {
                  title: "Now!",
                  value: "now",
                },
                {
                  title: "Yesterday!!!",
                  value: "yesterday",
                },
              ],
              multiple: true,
              clearable: true,
            },
            events: {
              onChange: (value) => {
                console.log(value);
              },
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
      color: "primary",
      prependIcon: "mdi-heart",
    },
    click(data) {
      console.log("data: ", data);
    },
  },
};

const deleteForm = () => {
  alert("Deleted!");
};
</script>

<template>
  <DataForm id="contact-form" :api="api">
    <template #buttons>
      <v-btn variant="text" color="error" @click="deleteForm"> Delete </v-btn>
    </template>
  </DataForm>
</template>
