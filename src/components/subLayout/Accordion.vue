<script setup>
import { useLeafValidation } from "@/composables/useLeafValidation.js";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Object,
    default: () => {},
  },
  id: {
    type: String,
    required: true,
  },
});

const { leaf, handleLeafError } = useLeafValidation(props);

onMounted(() => {
  document.addEventListener("dataFormSubmitFailed", () => handleLeafError());
});
</script>

<template>
  <v-expansion-panels mandatory="force" v-model="leaf">
    <v-expansion-panel v-for="(item, i) in items" :key="i">
      <v-expansion-panel-title> {{ item.title }} </v-expansion-panel-title>
      <v-expansion-panel-text eager>
        <InputGroups
          v-bind="{ ...props }"
          :item="item"
          :leaf="leaf"
          :tabKey="i"
        />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
