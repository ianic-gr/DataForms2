<script setup>
  import { useFieldType } from "@/composables/useFieldType";
  import { useField } from "vee-validate";

  const dataformsPluginOptions = inject("dataformsPluginOptions");

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

  const fieldReturn = defineModel("return");

  const uploadedFiles = ref([]);
  const key = ref(0);

  const isMultiple = computed(() => !!props.input.options?.multiple);

  const previewFiles = computed(() => {
    if (!props.input.preview) return [];
    return Array.isArray(props.input.preview) ? props.input.preview : [props.input.preview];
  });

  const submitFiles = (files) => {
    uploadedFiles.value = files;
    const submittedFiles = files.map((v) => v.file);

    if (isMultiple.value) {
      fieldValue.value = submittedFiles;
    } else {
      fieldValue.value = submittedFiles.length ? submittedFiles[0] : null;
    }
  };

  const deleteFiles = (files) =>
    files.reduce((promise, file) => promise.then(() => props.input.onDelete?.(file)), Promise.resolve());

  const fileNames = (v) => {
    if (v === null || v === undefined) return "";
    return (Array.isArray(v) ? v : [v])
      .map((item) => item?.name ?? "")
      .filter(Boolean)
      .join(", ");
  };

  watch(
    fieldValue,
    (v) => {
      if (v === null) return;

      const names = fileNames(v);

      if (v === fieldModel.value && names === fieldReturn.value) return;

      fieldModel.value = v;
      fieldReturn.value = names;
    },
    { immediate: true }
  );

  watch([previewFiles, uploadedFiles], () => {
    key.value++;
  });
</script>

<template>
  <div>
    <div>
      <v-card v-if="!previewFiles.length && !uploadedFiles.length" color="surface-light" class="pa-6 text-center">
        <v-icon size="x-large" color="grey" class="mb-4" :icon="dataformsPluginOptions?.icons.fileUpload.documentRemove" />

        <div class="text-h6 mb-0">
          {{ options.label }}
        </div>

        <div class="text-subtitle-1 text-medium-emphasis">
          {{ $t("$dataforms.fileUpload.noFilesUploadedYet") }}
          <span v-if="isMultiple">, {{ $t("$dataforms.fileUpload.canUploadMultiple") }}</span>
        </div>

        <v-btn
          variant="tonal"
          color="primary"
          size="large"
          class="mt-4"
          :prepend-icon="dataformsPluginOptions?.icons.fileUpload.upload"
        >
          {{ $t("$dataforms.fileUpload.upload") }}
          <FileUploadDialogUpload :options="input.options" @submit-files="submitFiles" />
        </v-btn>
      </v-card>
      <div v-else>
        <div class="text-h6 mb-0">{{ options.label }}:</div>
        <FileUploadToolbar
          :key="key"
          v-model:uploaded-files="uploadedFiles"
          :preview-files="previewFiles"
          :errors="errorMessage"
          :label="options.label"
          @delete-files="deleteFiles"
        >
          <template #upload>
            <v-btn variant="tonal" :prepend-icon="dataformsPluginOptions?.icons.fileUpload.upload">
              {{ $t("$dataforms.fileUpload.upload") }}
              <FileUploadDialogUpload :options="input.options" @submit-files="submitFiles" />
            </v-btn>
          </template>
        </FileUploadToolbar>
      </div>
    </div>
  </div>
</template>
