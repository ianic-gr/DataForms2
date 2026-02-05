<script setup>
import { useInputEvents } from "@/composables/useInputEvents";
import { useFieldType } from "@/composables/useFieldType";
import { useField } from "vee-validate";

const props = defineProps({
  input: {
    type: Object,
    default: () => {
      return {};
    },
  },
  inputKey: {
    type: String,
    default: "",
  },
  options: {
    type: Object,
    default: () => {
      return {};
    },
  },
  formId: {
    required: true,
    type: String,
  },
  events: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const { field: fieldValue, fieldProps } = useFieldType(props);
const field = useField(props.inputKey, !props.input.readOnly ? props.input.validation : "");
const { onSelect } = useInputEvents(fieldProps);

const fieldReturn = defineModel("return");

const selectedAllItems = computed(() => fieldValue.value?.length === props.options.items?.length);
const selectedSomeItems = computed(() => fieldValue.value?.length > 0);

const toggle = () => {
  if (selectedAllItems.value) {
    fieldValue.value = [];
    return;
  }

  fieldValue.value = props.options.items.slice();
};

watch(
  fieldValue,
  (v) => {
    if (v === null) return;

    // Process the initial value so it matches what select expects to return.
    let processedValue = v;
    if (Array.isArray(v) && v.length > 0 && typeof v[0] === "object" && !props.options.returnObject) {
      const itemValue = props.options.itemValue || props.options["item-value"] || "value";
      processedValue = v.map((item) => item[itemValue]);
      nextTick(() => {
        fieldValue.value = processedValue;
      });
    }

    field.value.value = processedValue;
    fieldReturn.value = processedValue;
  },
  { immediate: true },
);
</script>

<template>
  <div>
    <v-autocomplete
      v-model="fieldValue"
      v-bind="{ ...$attrs, ...options }"
      :error-messages="field.errorMessage.value"
      v-on="events"
      @click="() => events && events.hasOwnProperty('onClick') && events.onClick()"
      @change="onSelect"
    >
      <template v-for="(inputSlot, inputSlotKey) in input.itemSlots" :key="inputSlotKey" #[inputSlot.slot]="slotProps">
        <slot :name="inputSlot.template" v-bind="slotProps" />
      </template>

      <template v-if="options.multiple" #prepend-item>
        <v-list-item :title="$t('$dataforms.select.selectAll')" @click="toggle">
          <template #prepend>
            <v-checkbox-btn
              :color="selectedSomeItems ? 'primary' : undefined"
              :indeterminate="selectedSomeItems && !selectedAllItems"
              :model-value="selectedAllItems"
            />
          </template>
        </v-list-item>

        <v-divider class="mt-2" />
      </template>

      <template v-if="$slots.append" #append>
        <slot name="append" />
      </template>
    </v-autocomplete>
  </div>
</template>
