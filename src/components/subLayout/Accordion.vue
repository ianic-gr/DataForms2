<script setup>
import { useSlotsPrepare } from "@/composables/useSlotsPrepare.js";
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
  formId: {
    type: String,
    required: true,
  },
});

const { slots } = useSlotsPrepare();
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
