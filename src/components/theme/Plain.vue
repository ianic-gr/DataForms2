<template>
  <div class="theme-plain" v-bind="row?.options">
    <slot />
  </div>
</template>

<script>
export default {
  name: "ThemePlain",
  props: {
    row: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
