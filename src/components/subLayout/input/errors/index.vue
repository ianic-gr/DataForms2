<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  formId: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div v-for="(item, i) in props.items" :key="i">
    <Item :item="item" />
  </div>
</template>
