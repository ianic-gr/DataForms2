<script setup>
import { useFieldType } from "@/composables/useFieldType";
import { useField } from "vee-validate";

const props = defineProps({
  input: {
    type: Object,
    default: () => {},
  },
  inputKey: {
    type: String,
    default: "",
  },
  options: {
    type: Object,
    default: () => {},
  },
  formId: {
    required: true,
    type: String,
  },
  events: {
    type: Object,
    default: () => {},
  },
});

const { field: fieldValue } = useFieldType(props);
const field = useField(
  props.inputKey,
  !props.input.readOnly ? props.input.validation : ""
);

const fieldReturn = defineModel("return");

const uploadedFiles = ref([]);
const key = ref(0);

const previewFiles = computed(() => {
  if (!props.input.preview) return [];
  return Array.isArray(props.input.preview) ? props.input.preview : [props.input.preview];
});

const submitFiles = (files) => {
  uploadedFiles.value = files;
  const submittedFiles = uploadedFiles.value.map((v) => v.file);

  if (props.input.options.multiple) {
    fieldValue.value = submittedFiles;
  } else {
    fieldValue.value = submittedFiles.length ? submittedFiles[0] : null;
  }
};

const deleteFiles = async (files) => {
  for (const file of files) {
    await props.input.onDelete(file);
  }
};

watch(
  fieldValue,
  (v) => {
    if (v === null && !fieldReturn.value) return;

    field.value.value = v;
    fieldReturn.value = (Array.isArray(v) ? v : [v]).map((item) => item.name).join(", ");
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
      <v-card
        v-if="!previewFiles?.length && !uploadedFiles.length"
        color="grey-lighten-4"
        class="pa-6 text-center"
      >
        <v-icon size="x-large" color="grey" class="mb-4">
          mdi-file-document-remove
        </v-icon>
        <div class="text-h6 mb-3">No Files Uploaded Yet</div>

        <div
          v-if="input.options.multiple"
          class="text-subtitle-1 mb-4 text-medium-emphasis"
        >
          You can upload multiple files at once
        </div>

        <v-btn
          variant="tonal"
          color="primary"
          size="large"
          prepend-icon="mdi-upload-circle"
        >
          upload
          <FileUploadDialogUpload :options="input.options" @submit-files="submitFiles" />
        </v-btn>
      </v-card>
      <div v-else>
        <FileUploadToolbar
          :key="key"
          v-model:uploaded-files="uploadedFiles"
          :preview-files="previewFiles"
          :errors="field.errorMessage.value"
          @delete-files="deleteFiles"
        >
          <template #upload>
            <v-btn variant="tonal" prepend-icon="mdi-upload-circle">
              upload
              <FileUploadDialogUpload
                :options="input.options"
                @submit-files="submitFiles"
              />
            </v-btn>
          </template>
        </FileUploadToolbar>
      </div>
    </div>
  </div>
</template>
