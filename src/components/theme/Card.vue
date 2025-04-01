<template>
  <v-card class="theme-card px-5 py-4" v-bind="row?.options">
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ThemeCard",
  props: {
    row: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
