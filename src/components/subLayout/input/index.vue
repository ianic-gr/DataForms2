<script setup>
const cols = ref(null);

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  formId: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    default: "Plain",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

//Manipulates the column attributes (for now apply the underscore rules (_responsive))
const parsedCol = (col) => {
  const ret = {};

  Object.keys(col).forEach((colField) => {
    if (colField.startsWith("_")) return;
    ret[colField] = col[colField];
  });

  return ret;
};

onMounted(() => {
  cols.value = props.items;
});
</script>

<template>
  <v-row>
    <v-col
      cols="12"
      v-for="(col, x) in items"
      v-bind="{ ...(col._responsive || {}) }"
      :key="x"
    >
      <div v-for="(input, inputKey) in parsedCol(col)" :key="inputKey">
        <!-- Component changes when currentTab changes -->
        <Field
          :input="input"
          :inputKey="inputKey"
          :formId="formId"
          :loading="loading"
          :theme="theme"
        >
          <template
            v-for="inputSlot in input.itemSlots"
            #[inputSlot]="{ item }"
          >
            <slot :name="inputSlot" :item="item" />
          </template>
        </Field>
      </div>
    </v-col>
  </v-row>
</template>
