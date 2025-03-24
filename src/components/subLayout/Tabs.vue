<script setup>
import defu from "defu";
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

const tabsOptions = computed(() => {
  return defu(
    {
      header: null,
    },
    props.options
  );
});

onMounted(() => {
  document.addEventListener("dataFormSubmitFailed", () => {
    handleLeafError();
  });
});
</script>

<template>
  <v-card id="sub-layout-tabs">
    <v-toolbar
      v-if="tabsOptions.header"
      v-bind="{ ...(tabsOptions.toolbar || {}) }"
      :color="tabsOptions.color || 'primary'"
      flat
      dark
    >
      <v-toolbar-title>{{ tabsOptions.header }}</v-toolbar-title>
    </v-toolbar>
    <v-tabs
      v-model="leaf"
      :slider-color="tabsOptions.color || 'primary'"
      :vertical="!tabsOptions.horizontal"
    >
      <v-tab v-for="(item, i) in items" :key="i">
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-card-text class="pa-0">
      <v-tabs-window v-model="leaf">
        <v-tabs-window-item v-for="(item, i) in items" :key="`tabitem_${i}`" eager>
          <v-card flat>
            <v-card-text>
              <InputGroups v-bind="{ ...props }" :item="item" :leaf="leaf" :tab-key="i" />
            </v-card-text>
          </v-card>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>
