<script setup>
const result = ref(null);
const api = {
  rows: [
    { slots: ["Binding"] },
    {
      title: "Api form",
      input: [
        {
          email: {
            options: {
              label: "Email",
            },
            validation: "required",
          },
        },
      ],
    },
  ],
  binder: {
    name: {
      value: "",
      error: "super fail!",
      invalid: true,
    },
    surname: null,
    phone: null,
  },
  submit: {
    title: "Submit",
    color: "primary",
    click: (formData) => {
      console.log("FormData: ", formData);
      result.value = JSON.parse(JSON.stringify(formData));
    },
  },
};
</script>

<template>
  <DataForm id="contact-form" :api="api">
    <template v-slot:Binding>
      <h2>Binded form</h2>
      <v-row>
        <v-col cols="12">
          <v-btn @click="api.binder.name.invalid = false"
            >Make name valid</v-btn
          >
        </v-col>
        <v-col>
          <v-text-field
            v-model="api.binder.name.value"
            label="Name"
            outlined
            required
          />
        </v-col>
        <v-col
          ><v-text-field v-model="api.binder.surname" label="Surname" outlined
        /></v-col>
        <v-col>
          <v-text-field v-model="api.binder.phone" label="Phone" outlined
        /></v-col>
      </v-row>
    </template>
  </DataForm>
  <div v-if="result" class="mt-4">
    <h3>Result:</h3>
    {{ result }}
  </div>
</template>
