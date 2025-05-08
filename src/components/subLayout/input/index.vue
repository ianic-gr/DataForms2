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
  <v-row class="dataforms-input">
    <v-col
      v-for="(col, x) in items"
      v-bind="{ ...(col._responsive || {}) }"
      :key="x"
      cols="12"
      class="dataforms-input__col"
    >
      <div v-for="(input, inputKey) in parsedCol(col)" :key="inputKey">
        <!-- Component changes when currentTab changes -->

        <Field
          :input="input"
          :input-key="inputKey"
          :form-id="formId"
          :loading="loading"
          :theme="theme"
        >
          <template
            v-for="(inputSlot, inputSlotKey) in input.itemSlots"
            :key="inputSlotKey"
            #[inputSlot.template]="slotProps"
          >
            <slot :name="inputSlot.template" v-bind="slotProps" />
          </template>
        </Field>
      </div>
    </v-col>
  </v-row>
</template>
