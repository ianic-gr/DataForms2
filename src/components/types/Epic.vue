<script setup>
  import DOMPurify from "dompurify";

  const props = defineProps({
    input: {
      type: Object,
      default: () => ({}),
    },
    inputKey: {
      type: String,
      default: "",
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    events: {
      type: Object,
      default: () => ({}),
    },
  });

  const safeHtml = computed(() => (props.options.html ? DOMPurify.sanitize(props.options.html) : ""));
</script>

<template>
  <div>
    <div v-if="safeHtml" v-html="safeHtml" />
    <p v-else>
      {{ options.text }}
    </p>
  </div>
</template>
