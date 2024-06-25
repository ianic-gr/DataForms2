<script setup>
import { storeToRefs } from "pinia";
import { useSideMenuStore } from "@/stores/sideMenuStore";

const sideMenuStore = useSideMenuStore();
const { menu } = storeToRefs(sideMenuStore);

const links = [
  { title: "Docs", to: "/" },
  { title: "Examples", to: "/examples" },
  { title: "Diagrams", to: "/diagrams" },
];

onMounted(() => {
  menu.value = [
    {
      title: "Contact Form",
      to: "/examples/contactForm",
    },
    {
      title: "Conditionals",
      to: "/examples/conditionals",
    },
    {
      title: "Epic",
      to: "/examples/epic",
    },
  ];
});
</script>

<template>
  <v-app id="inspire">
    <v-app-bar flat>
      <v-container class="mx-auto d-flex align-center justify-center">
        <h2 class="me-5">📃 Dataforms 2</h2>

        <v-btn
          :to="link.to"
          v-for="link in links"
          :key="link.title"
          :text="link.title"
          variant="text"
        ></v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="160">
          <v-text-field
            density="compact"
            label="Search"
            rounded="lg"
            variant="solo-filled"
            flat
            hide-details
            single-line
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item
                  v-for="(item, i) in menu"
                  :key="i"
                  :title="item.title"
                  :to="item.to"
                  link
                ></v-list-item>

                <v-divider v-if="$route.path !== '/'" class="my-2"></v-divider>

                <v-list-item
                  v-if="$route.path !== '/'"
                  to="/"
                  color="grey-lighten-4"
                  title="← Back"
                  link
                ></v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <v-container>
                <router-view />
              </v-container>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
