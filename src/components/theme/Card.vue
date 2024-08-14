<template>
  <div class="theme-card">
    <v-card class="px-5 py-8">
      <v-card-text>
        <slot />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ThemeCard",
};
</script>
