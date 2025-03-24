<script setup lang="ts">
import type { AliasLanguages } from "@/types/Alias";
import deepClone from "@/utils/deepClone";

const emit = defineEmits(["submit"]);
const dialog = defineModel<boolean>({ default: false });
const alias = defineModel<Record<AliasLanguages, string>>("alias", {
  default: () => {
    return {};
  },
});

const translations = ref<Record<AliasLanguages, string>>({
  en: "",
  el: "",
  de: "",
  ro: "",
});

const submit = () => {
  alias.value = deepClone(translations.value);
  dialog.value = false;
  emit("submit", translations.value);
};

watch(alias, (v: any) => (translations.value = deepClone(v)), {
  immediate: true,
  deep: true,
});
</script>

<template>
  <v-dialog v-model="dialog" max-width="500">
    <template #default="{ isActive }">
      <v-card rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="text-h5 text-medium-emphasis ps-2">Translations</div>

          <v-btn icon="mdi-close" variant="text" @click="isActive.value = false" />
        </v-card-title>

        <v-divider class="mb-4" />

        <v-card-text>
          <v-text-field
            v-for="(_, label) in translations"
            :key="label"
            v-model="translations[label]"
            :label="label"
            clearable
          />
        </v-card-text>

        <v-divider class="mt-2" />

        <v-card-actions class="my-2 d-flex justify-end">
          <v-btn
            class="text-none"
            rounded="xl"
            text="Cancel"
            @click="isActive.value = false"
          />

          <v-btn
            class="text-none px-4"
            color="primary"
            rounded="xl"
            text="Confirm"
            variant="tonal"
            @click="submit"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
