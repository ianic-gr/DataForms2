<script setup>
import { isObject } from "vuetify/lib/util/helpers";
import { useSlotsPrepare } from "@/composables/useSlotsPrepare.js";
import { useConditionals } from "@/composables/useConditionals.js";

const Plain = defineAsyncComponent(() => import("@/components/theme/Plain.vue"));
const Fluid = defineAsyncComponent(() => import("@/components/theme/Fluid.vue"));
const Breeze = defineAsyncComponent(() => import("@/components/theme/Breeze.vue"));
const Card = defineAsyncComponent(() => import("@/components/theme/Card.vue"));

const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});

const { slots, subLayoutSlots } = useSlotsPrepare();
const { showOnConditions } = useConditionals(props.id);

const themes = {
  Plain,
  Fluid,
  Breeze,
  Card,
};

const themeTitle = computed(() => {
  return props.row.theme !== "Fluid" && props.row?.title?.length;
});

const rowInput = computed(() => {
  if (!props.row.input?.length) return [];
  if (!("set" in props.row.input[0])) {
    return {
      input: {
        title: props.row.title,
        theme: props.row.theme,
        themeComp: props.row.theme ? themes[props.row.theme] : themes["Plain"],
        set: props.row.input,
        options: props.row.options,
      },
    };
  }

  return props.row.input;
});
</script>

<template>
  <v-row v-if="showOnConditions(row.conditionals)" class="dataforms-row">
    <slot />
    <v-col v-if="themeTitle" cols="12">
      <h2>{{ row.title }}</h2>
    </v-col>
    <v-col v-if="isObject(row.title) && 'component' in row.title" cols="12">
      <component :is="row.title.component" v-bind="{ ...(row.title.bind || {}) }" />
    </v-col>
    <slot name="rowSlot" />
    <v-col v-if="row.accordion" cols="12">
      <SubLayoutAccordion
        :id="id"
        :items="row.accordion.items"
        :options="row.accordion.options"
      >
        <template
          v-for="(inputSlot, inputSlotKey) in subLayoutSlots(row.accordion.items)"
          :key="inputSlotKey"
          #[inputSlot.template]="slotProps"
        >
          <slot :name="inputSlot.template" v-bind="slotProps" />
        </template>
      </SubLayoutAccordion>
    </v-col>
    <v-col v-if="row.tabs" cols="12">
      <SubLayoutTabs :id="id" :items="row.tabs.items" :options="row.tabs.options">
        <template
          v-for="(inputSlot, inputSlotKey) in subLayoutSlots(row.tabs.items)"
          :key="inputSlotKey"
          #[inputSlot.template]="slotProps"
        >
          <slot :name="inputSlot.template" v-bind="slotProps" />
        </template>
      </SubLayoutTabs>
    </v-col>
    <v-col cols="12">
      <template v-for="(setRow, i) in rowInput" :key="i">
        <component :is="setRow.themeComp" v-show="!setRow.hidden" :row="setRow">
          <SubLayoutInput
            ref="dataFormInput"
            :items="setRow.set"
            :form-id="id"
            :loading="loading"
            :theme="setRow.theme"
          >
            <template
              v-for="(inputSlot, inputSlotKey) in slots(setRow.set)"
              :key="inputSlotKey"
              #[inputSlot.template]="slotProps"
            >
              <slot :name="inputSlot.template" v-bind="slotProps" />
            </template>
          </SubLayoutInput>
        </component>
      </template>
      <div v-if="row.dynamic?.component">
        <component :is="row.theme ? themes[row.theme] : themes['Plain']" :row="row">
          <component :is="row.dynamic.component" v-bind="{ ...props, ...row.dynamic }" />
        </component>
      </div>
    </v-col>
  </v-row>
</template>
