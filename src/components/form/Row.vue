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
      },
    };
  }

  return props.row.input;
});

const theRowTitle = computed(() => {
  const title = props.row.title;
  let rowTitle;

  if (isObject(title)) {
    if ("html" in title) {
      rowTitle = title.html;
    } else if ("text" in title) {
      rowTitle = `<h2 class="${title.class || ""}">${title.text}</h2>`;
    }
  } else {
    rowTitle = title ? `<h2>${title}</h2>` : "";
  }

  return rowTitle;
});
</script>

<template>
  <v-row v-if="showOnConditions(row.conditionals)">
    <v-col cols="12" v-if="themeTitle" v-html="theRowTitle"></v-col>
    <v-col cols="12" v-if="isObject(row.title) && 'component' in row.title">
      <component
        :is="row.title.component"
        v-bind="{ ...(row.title.bind || {}) }"
      ></component>
    </v-col>
    <slot name="rowSlot" />
    <v-col cols="12" v-if="row.accordion">
      <Accordion
        :formId="id"
        :items="row.accordion.items"
        :options="row.accordion.options"
      />
    </v-col>
    <v-col cols="12" v-if="row.tabs">
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
          cols="12"
          v-bind="{ ...$attrs, ...(setRow.responsive || {}) }"
          v-for="(setRow, i) in rowInput"
          :key="i"
          v-show="!setRow.hidden"
        >
          <component :is="setRow.themeComp" :row="setRow">
            <Input
              ref="dataFormInput"
              :items="setRow.set"
              :formId="id"
              :loading="loading"
              :theme="setRow.theme"
            >
              <template
                v-for="inputSlot in slots(setRow.set)"
                #[inputSlot]="{ item }"
              >
                <slot :name="inputSlot" :item="item" />
              </template>
            </Input>
          </component>
        </v-col>
        <v-col v-if="row.dynamic?.component" cols="12">
          <component
            :is="row.theme ? themes[row.theme] : themes['Plain']"
            :row="row"
          >
            <component
              :is="row.dynamic.component"
              v-bind="{ ...props, ...row.dynamic }"
            ></component>
          </component>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
