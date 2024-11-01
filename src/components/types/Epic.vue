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
  formId: {
    required: true,
    type: String,
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
  <div
    :class="`dataforms-field dataforms-epic--${formId}_${inputKey} dataforms-epic--${formId} dataforms-epic--${inputKey}`"
  >
    <div v-if="options.html" v-html="options.html"></div>
    <p v-else>{{ options.text }}</p>
  </div>
</template>
