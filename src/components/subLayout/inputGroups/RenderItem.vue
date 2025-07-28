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
  <div class="dataforms-renderItem">
    <SubLayoutInput v-if="item.input?.length" :items="item.input" :form-id="id">
      <template v-for="inputSlot in slots(item.input)" #[inputSlot.template]="slotProps">
        <slot :name="inputSlot.template" v-bind="slotProps" :active="leaf === tabKey" />
      </template>
    </SubLayoutInput>

    <component
      :is="item.dynamic.component"
      v-if="item.dynamic?.component"
      v-bind="{ ...props, ...item.dynamic }"
      :active="leaf === tabKey"
    />
  </div>
</template>
