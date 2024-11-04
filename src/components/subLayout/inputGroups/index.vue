<script setup>
const props = defineProps({
  item: {
    type: [Array, Object],
    required: true,
  },
  options: {
    type: Object,
    default: () => {},
  },
  id: {
    type: String,
    required: true,
  },
  leaf: {
    type: Number,
    required: true,
  },
  tabKey: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="dataforms-inputGroups">
    <RenderItem v-bind="{ ...props }" />

    <v-card
      v-for="(inputGroup, i) in item.inputGroups"
      v-bind="{ ...inputGroup.options }"
      :key="i"
      class="mt-4"
    >
      <v-card-title>
        {{ inputGroup.title }}
      </v-card-title>
      <v-card-text>
        <RenderItem v-bind="{ ...props, item: inputGroup }" />
      </v-card-text>
    </v-card>
  </div>
</template>
