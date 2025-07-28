<script setup>
import { useSlotsPrepare } from "@/composables/useSlotsPrepare.js";
const { slots } = useSlotsPrepare();

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
    <SubLayoutInputGroupsRenderItem v-bind="{ ...props }">
      <template v-for="inputSlot in slots(item.input)" #[inputSlot.template]="slotProps">
        <slot :name="inputSlot.template" v-bind="slotProps" :active="leaf === tabKey" />
      </template>
    </SubLayoutInputGroupsRenderItem>

    <v-card
      v-for="(inputGroup, i) in item.inputGroups"
      v-bind="{ ...inputGroup.options }"
      :key="i"
      class="inputGroup-card mt-4"
    >
      <v-card-title>
        {{ inputGroup.title }}
      </v-card-title>
      <v-card-text>
        <SubLayoutInputGroupsRenderItem v-bind="{ ...props, item: inputGroup }">
          <template
            v-for="inputSlot in slots(inputGroup.input)"
            #[inputSlot.template]="slotProps"
          >
            <slot
              :name="inputSlot.template"
              v-bind="slotProps"
              :active="leaf === tabKey"
            />
          </template>
        </SubLayoutInputGroupsRenderItem>
      </v-card-text>
    </v-card>
  </div>
</template>
