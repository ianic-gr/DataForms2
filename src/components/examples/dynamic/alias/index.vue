<script setup lang="ts">
import type { AliasLanguages } from "@/types/Alias";
import fillAttributes from "@/utils/fillAttributes";
import fillEmptyAttributes from "@/utils/fillEmptyAttributes";

interface Props {
  fieldProps?: Record<string, any>;
}
defineProps<Props>();

const alias = defineModel<Record<AliasLanguages, string>>({ required: true });

const dialog = ref<boolean>(false);

const currentLanguageKey = computed<AliasLanguages>(() => {
  return "en" as AliasLanguages;
});

const clearAlias = () => {
  alias.value = fillAttributes(alias.value, "");
};

const onBlur = () => {
  alias.value = fillEmptyAttributes(
    alias.value,
    alias.value[currentLanguageKey.value]
  );
};
</script>

<template>
  <div>
    <TranslationsDialog v-model="dialog" v-model:alias="alias" />
    <v-text-field
      v-if="Object.hasOwn(alias, currentLanguageKey)"
      v-model="alias[currentLanguageKey]"
      label="Title"
      append-inner-icon="mdi-translate-variant"
      v-bind="{ ...$attrs, ...fieldProps }"
      clearable
      @click:append-inner="dialog = true"
      @click:clear="clearAlias"
      @blur="onBlur"
    />
  </div>
</template>
