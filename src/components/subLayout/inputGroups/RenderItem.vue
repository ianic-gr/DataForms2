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
    <Input :items="item.input" :formId="id">
      <template v-for="inputSlot in slots(item.input)" #[inputSlot]="{ item }">
        <slot :name="inputSlot" :item="item" :active="leaf === tabKey" />
      </template>
    </Input>

    <component
      v-if="item.dynamic?.component"
      :is="item.dynamic.component"
      v-bind="{ ...props, ...item.dynamic }"
      :active="leaf === tabKey"
    />
  </div>
</template>
