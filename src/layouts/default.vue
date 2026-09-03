<script setup>
  import { storeToRefs } from "pinia";
  import { useSideMenuStore } from "@/stores/sideMenuStore";
  import { useTheme } from "vuetify";

  const sideMenuStore = useSideMenuStore();
  const theme = useTheme();

  const { menu } = storeToRefs(sideMenuStore);

  const inProduction = ref(false);

  const links = [
    { title: "Docs", to: "/" },
    { title: "Examples", to: "/examples" },
    { title: "Diagrams", to: "/diagrams" },
  ];

  function toggleTheme(e) {
    // passing target element will make it work for both clicks and keyboard interactions
    theme.setTransitionOrigin(e.target);
    theme.toggle();
  }

  onMounted(() => {
    inProduction.value = import.meta.env.PROD;
    const exampleFolder = inProduction.value ? "examples" : "devExamples";

    menu.value = [
      {
        title: "Types",
      },
      {
        title: "Checks & radios",
        to: `/${exampleFolder}/checks-radios`,
      },
      {
        title: "Datepickers",
        to: `/${exampleFolder}/datepickers`,
      },
      {
        title: "Password",
        to: `/${exampleFolder}/password`,
      },
      {
        title: "FileInput",
        to: `/${exampleFolder}/fileInput`,
      },
      {
        title: "FileUpload",
        to: `/${exampleFolder}/fileUpload`,
      },
      {
        title: "Number Input",
        to: `/${exampleFolder}/numberinput`,
      },
      {
        title: "Conditionals",
        to: `/${exampleFolder}/conditionals`,
      },
      {
        title: "Epic",
        to: `/${exampleFolder}/epic`,
      },
      {
        title: "Layout",
      },
      {
        title: "Accordion",
        to: `/${exampleFolder}/accordion`,
      },
      {
        title: "Tabs ",
        to: `/${exampleFolder}/tabs`,
      },
      {
        title: "Theme",
      },
      {
        title: "Fluid",
        to: `/${exampleFolder}/themes/fluid`,
      },
      {
        title: "Breeze",
        to: `/${exampleFolder}/themes/breeze`,
      },
      {
        title: "Use Cases",
      },
      {
        title: "Readonly Fields",
        to: `/${exampleFolder}/readonly`,
      },
      {
        title: "Contact Form",
        to: `/${exampleFolder}/contactForm`,
      },
      {
        title: "Slots",
        to: `/${exampleFolder}/slots`,
      },
      {
        title: "Dynamic Components",
        to: `/${exampleFolder}/dynamicComponents`,
      },
    ];
  });
</script>

<template>
  <v-app-bar flat>
    <v-container class="mx-auto d-flex align-center justify-space-between">
      <h2 class="me-5">📃 Dataforms 2</h2>

      <v-btn v-for="link in links" :key="link.title" :to="link.to" :text="link.title" variant="text" />

      <v-spacer />

      <v-btn icon="mdi-theme-light-dark" @click="toggleTheme" />
    </v-container>
  </v-app-bar>

  <v-main class="bg-surface-light">
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-sheet rounded="lg">
            <v-list rounded="lg">
              <template v-for="(item, i) in menu" :key="i">
                <v-list-item v-if="item.to" :title="item.title" :to="item.to" link />

                <p v-else class="px-4 font-weight-bold mt-2">
                  {{ item.title }}
                </p>
              </template>

              <v-divider v-if="$route.path !== '/'" class="my-2" />

              <v-list-item v-if="$route.path !== '/'" to="/" color="grey-lighten-4" title="← Back" link />
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
</template>
