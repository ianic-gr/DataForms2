<script setup>
import { v4 as uuidv4 } from "uuid";
import { VFileUpload } from "vuetify/labs/VFileUpload";

const dataformsPluginOptions = inject("dataformsPluginOptions");

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
  const files = Array.isArray(uploadFiles.value) ? uploadFiles.value : [uploadFiles.value];

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
        <v-card-text class="pa-6">
          <v-file-upload
            v-model="uploadFiles"
            v-bind="options"
            :density="!uploadFiles ? 'default' : 'compact'"
            clearable
            :icon="dataformsPluginOptions?.icons.fileUpload.cloudUpload"
          />
        </v-card-text>

        <v-divider />

        <v-card-actions class="my-2 d-flex justify-end">
          <v-btn class="text-none" :text="$t('$dataforms.global.cancel')" @click="isActive.value = false" />
          <v-btn class="text-none" color="primary" :text="$t('$dataforms.global.submit')" variant="flat" @click="submit" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
