<script setup>
import { useSlotsPrepare } from "@/composables/useSlotsPrepare.js";

const { slots } = useSlotsPrepare();

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Object,
    default: () => {},
  },
  formId: {
    type: String,
    required: true,
  },
});

const leaf = ref(0);
</script>

<template>
  <v-expansion-panels mandatory="force" :value="leaf">
    <v-expansion-panel v-for="(item, i) in items" :key="i">
      <v-expansion-panel-title> {{ item.title }} </v-expansion-panel-title>
      <v-expansion-panel-text eager>
        <Input :items="item.input" :formId="formId">
          <template
            v-for="inputSlot in slots(item.input)"
            #[inputSlot]="{ item }"
          >
            <slot :name="inputSlot" :item="item" />
          </template>
        </Input>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
