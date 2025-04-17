<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  formId: {
    type: String,
    required: true,
  },
});

const allFields = ref([]);

onMounted(() => {
  props.items.forEach((item) => {
    const key = Object.keys(item)[0];
    const itemValue = item[key];

    const field = useField(key, !itemValue.readOnly ? itemValue.validation : "");

    if (itemValue.default !== null) {
      field.value.value = itemValue.options.default;
    }

    allFields.value.push(field.errorMessage);
  });
});
</script>

<template>
  <div v-for="(error, i) in allFields" :key="i">
    <v-alert v-if="error.value" color="error" icon="mdi-alert-circle" class="mb-4" border>
      {{ error }}
    </v-alert>
  </div>
</template>
