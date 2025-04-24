<script setup>
import { isObject } from "vuetify/lib/util/helpers";
import { useSlotsPrepare } from "@/composables/useSlotsPrepare.js";
import { useConditionals } from "@/composables/useConditionals.js";
import Plain from "../../components/theme/Plain.vue";
import Fluid from "../../components/theme/Fluid.vue";
import Breeze from "../../components/theme/Breeze.vue";
import Card from "../../components/theme/Card.vue";

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
  <v-row v-if="showOnConditions(row.conditionals)">
    <v-col v-if="themeTitle" cols="12">
      <h2>{{ row.title }} sas</h2>
    </v-col>
    <v-col v-if="isObject(row.title) && 'component' in row.title" cols="12">
      <component :is="row.title.component" v-bind="{ ...(row.title.bind || {}) }" />
    </v-col>
    <slot name="rowSlot" />
    <v-col v-if="row.accordion" cols="12">
      <Accordion :id="id" :items="row.accordion.items" :options="row.accordion.options" />
    </v-col>
    <v-col v-if="row.tabs" cols="12">
      <Tabs :id="id" :items="row.tabs.items" :options="row.tabs.options">
        <!-- <template
          v-for="inputSlot in subLayoutSlots(row.tabs.items)"
          #[inputSlot]="{ item }"
        >
          <slot :name="inputSlot" :item="item" />
        </template> -->
      </Tabs>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col
          v-for="(setRow, i) in rowInput"
          v-show="!setRow.hidden"
          v-bind="{ ...$attrs, ...(setRow.responsive || {}) }"
          :key="i"
          cols="12"
        >
          <component :is="setRow.themeComp" :row="setRow">
            <Input
              ref="dataFormInput"
              :items="setRow.set"
              :form-id="id"
              :loading="loading"
              :theme="setRow.theme"
            >
              <template v-for="inputSlot in slots(setRow.set)" #[inputSlot]="{ item }">
                <slot :name="inputSlot" :item="item" />
              </template>
            </Input>
          </component>
        </v-col>
        <v-col v-if="row.dynamic?.component" cols="12">
          <component :is="row.theme ? themes[row.theme] : themes['Plain']" :row="row">
            <component
              :is="row.dynamic.component"
              v-bind="{ ...props, ...row.dynamic }"
            />
          </component>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
