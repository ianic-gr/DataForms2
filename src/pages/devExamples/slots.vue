<script setup>
const result = ref(null);
const binder = ref({
  name: "",
  surname: "",
  phone: "",
});
const validation = ref({});
const customInvalid = ref(true);

const api = ref({
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
  submit: {
    options: {
      text: "Submit",
      color: "primary",
    },
    beforeSubmit: (formData) => {
      validation.value.name = null;

      if (!formData.name?.length && customInvalid.value) {
        validation.value.name = "invalid";
      }
    },
    click: (formData) => {
      console.log("FormData: ", formData);
      result.value = JSON.parse(JSON.stringify(formData));
    },
  },
});
</script>

<template>
  <DataForm
    id="slots-form"
    v-model:binder="binder"
    v-model:validation="validation"
    :api="api"
  >
    <template #Binding>
      <h2>Binded form</h2>
      <v-row>
        <v-col cols="12">
          <v-btn @click="customInvalid = false"> Make name valid </v-btn>
        </v-col>
        <v-col>
          <v-text-field
            v-model="binder.name"
            label="Name"
            outlined
            required
            :error-messages="validation.name"
          />
        </v-col>
        <v-col>
          <v-text-field v-model="binder.surname" label="Surname" outlined />
        </v-col>
        <v-col>
          <v-text-field v-model="binder.phone" label="Phone" outlined />
        </v-col>
      </v-row>
    </template>
  </DataForm>
  <div v-if="result" class="mt-4">
    <h3>Result:</h3>
    {{ result }}
  </div>
</template>
