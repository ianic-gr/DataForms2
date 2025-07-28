<script setup>
import { useLeafValidation } from "@/composables/useLeafValidation.js";
import { useSlotsPrepare } from "@/composables/useSlotsPrepare.js";

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
const { getApiSlots } = useSlotsPrepare();

onMounted(() => {
  document.addEventListener("dataFormSubmitFailed", (e) =>
    handleLeafError(e.detail.formID)
  );
});
</script>

<template>
  <v-expansion-panels v-model="leaf" mandatory="force">
    <v-expansion-panel v-for="(item, i) in items" :key="i">
      <v-expansion-panel-title> {{ item.title }} </v-expansion-panel-title>
      <v-expansion-panel-text eager>
        <SubLayoutInputGroups
          v-bind="{ ...props }"
          :item="item"
          :leaf="leaf"
          :tab-key="i"
        >
          <template
            v-for="(inputSlot, inputSlotKey) in getApiSlots(item)"
            :key="inputSlotKey"
            #[inputSlot.template]="slotProps"
          >
            <slot :name="inputSlot.template" v-bind="slotProps" />
          </template>
        </SubLayoutInputGroups>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
