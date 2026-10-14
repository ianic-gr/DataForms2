<script setup>
  import { useInputEvents } from "@/composables/useInputEvents";
  import { useFieldType } from "@/composables/useFieldType";
  import { useField } from "vee-validate";
  import { deepEqual } from "@/utils/deepEqual";

  defineOptions({ inheritAttrs: false });

  const props = defineProps({
    input: {
      type: Object,
      default: () => ({}),
    },
    inputKey: {
      type: String,
      default: "",
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    formId: {
      required: true,
      type: String,
    },
    events: {
      type: Object,
      default: () => ({}),
    },
  });

  const { field: fieldValue } = useFieldType(props);

  const { value: fieldModel, errorMessage } = useField(props.inputKey, !props.input.readOnly ? props.input.validation : "", {
    initialValue: props.options.default,
  });

  const { onSelect } = useInputEvents(props);

  const fieldReturn = defineModel("return");

  const itemsCount = computed(() => props.options.items?.length ?? 0);
  const selectedAllItems = computed(() => itemsCount.value > 0 && fieldValue.value?.length === itemsCount.value);
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
      let value = v;

      if (Array.isArray(v) && v.length > 0 && typeof v[0] === "object" && !props.options.returnObject) {
        const itemValue = props.options.itemValue || props.options["item-value"] || "value";
        value = v.map((item) => item[itemValue]);

        nextTick(() => {
          fieldValue.value = value;
        });
      }

      if (v === null) return;
      if (deepEqual(value, fieldModel.value) && deepEqual(value, fieldReturn.value)) return;

      fieldModel.value = value;
      fieldReturn.value = value;
    },
    { immediate: true }
  );
</script>

<template>
  <div>
    <v-autocomplete
      v-model="fieldValue"
      v-bind="{ ...$attrs, ...options }"
      :error-messages="errorMessage"
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
