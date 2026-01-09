<script setup>
defineProps({
  input: {
    type: Object,
    default: () => {
      return {};
    },
  },
  inputKey: {
    type: String,
    default: "",
  },
  options: {
    type: Object,
    default: () => {
      return {};
    },
  },
  events: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>

<template>
  <div>
    <div v-if="options.html" v-html="options.html" />
    <p v-else>
      {{ options.text }}
    </p>
  </div>
</template>
