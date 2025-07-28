<script setup>
import { v4 as uuidv4 } from "uuid";
import { VFileUpload } from "vuetify/labs/VFileUpload";

defineProps({
  options: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["submitFiles"]);

const dialog = ref(false);
const uploadFiles = ref();

const submit = () => {
  const files = Array.isArray(uploadFiles.value)
    ? uploadFiles.value
    : [uploadFiles.value];

  emit(
    "submitFiles",
    files.map((file) => {
      return {
        id: uuidv4(),
        file,
      };
    })
  );
  uploadFiles.value = undefined;
  dialog.value = false;
};
</script>

<template>
  <v-dialog v-model="dialog" activator="parent" max-width="800">
    <template #default="{ isActive }">
      <v-card rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="text-h5 text-medium-emphasis ps-2">Upload Files</div>

          <v-btn icon="mdi-close" variant="text" @click="isActive.value = false" />
        </v-card-title>

        <v-divider class="mb-4" />

        <v-card-text>
          <v-file-upload
            v-model="uploadFiles"
            v-bind="options"
            :density="!uploadFiles ? 'default' : 'compact'"
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
            class="text-none"
            color="primary"
            rounded="xl"
            text="Submit"
            variant="flat"
            @click="submit"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
