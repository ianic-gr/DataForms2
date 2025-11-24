<script setup>
import { useField } from "vee-validate";

const dataformsPluginOptions = inject("dataformsPluginOptions");

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const key = Object.keys(props.item)[0];
const itemValue = props.item[key];

const field = useField(key, !itemValue.readOnly ? itemValue.validation : "");

onMounted(() => {
  if (itemValue.default !== null) {
    field.value.value = itemValue.options.default;
  }
});
</script>

<template>
  <v-alert v-if="field.errorMessage.value" color="error" :icon="dataformsPluginOptions?.icons.alert" class="mb-4" border>
    {{ field.errorMessage.value }}
  </v-alert>
</template>
