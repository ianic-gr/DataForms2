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
            validation: "required|min:10",
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
            itemSlots: [
              {
                slot: "item",
                template: "pop",
              },
            ],
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

const deleteForm = () => {
  alert("Deleted!");
};
</script>

<template>
  <DataForm id="contact-form" :api="api" locale="el">
    <template #pop="{ props, item }">
      <v-list-item v-bind="props" :subtitle="item.raw.value" :title="item.raw.title" />
    </template>
    <template #buttons="{ submitProps }">
      <v-btn variant="text" color="error" @click="deleteForm"> Delete </v-btn>

      <v-btn-group color="primary" density="comfortable" rounded="pill" divided>
        <v-btn v-bind="submitProps" />

        <v-btn size="small" icon>
          <v-icon icon="mdi-menu-down" />

          <v-menu activator="parent" location="bottom end" transition="fade-transition">
            <v-list density="compact" min-width="250" rounded="lg" slim>
              <v-list-item prepend-icon="mdi-link" title="Copy link" link />

              <v-divider class="my-2" />

              <v-list-item min-height="24">
                <template #subtitle>
                  <div class="text-caption">Shared with John + 1 more</div>
                </template>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </v-btn-group>
    </template>
  </DataForm>
</template>
