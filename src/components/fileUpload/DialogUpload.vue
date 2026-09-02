<script setup>
  import { v4 as uuidv4 } from "uuid";
  import { useI18n } from "vue-i18n";

  const dataformsPluginOptions = inject("dataformsPluginOptions");

  const props = defineProps({
    options: {
      type: Object,
      default: () => {},
    },
  });

  const emit = defineEmits(["submitFiles"]);

  const { t } = useI18n();

  const dialog = ref(false);
  const uploadFiles = ref();
  const fileUpload = ref();

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

  const fileSize = computed(() => {
    const bytes = props.options.maxFileSize;

    if (!bytes) return false;

    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))}${units[i]}`;
  });

  const fileSizeRule = (files) => {
    if (!files || !fileSize.value) return true;

    const fileList = Array.isArray(files) ? files : [files];

    return (
      fileList.every((file) => file.size <= props.options.maxFileSize) ||
      t("$dataforms.fileUpload.maxFileSizeError", { size: fileSize.value })
    );
  };
</script>

<template>
  <v-dialog v-model="dialog" activator="parent" max-width="800">
    <template #default="{ isActive }">
      <v-card rounded="lg">
        <v-card-text class="pa-6">
          <v-file-upload
            ref="fileUpload"
            v-model="uploadFiles"
            v-bind="options"
            :density="!uploadFiles ? 'default' : 'compact'"
            :icon="dataformsPluginOptions?.icons.fileUpload.cloudUpload"
            :messages="[options.filterByType, fileSize].filter((item) => item).join(', ')"
            :rules="[fileSizeRule]"
            clearable
          />
        </v-card-text>

        <v-divider />

        <v-card-actions class="my-2 d-flex justify-end">
          <v-btn class="text-none" :text="$t('$dataforms.global.cancel')" @click="isActive.value = false" />
          <v-btn
            class="text-none"
            color="primary"
            :text="$t('$dataforms.global.submit')"
            variant="flat"
            :disabled="!fileUpload?.isValid || !uploadFiles?.length"
            @click="submit"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
