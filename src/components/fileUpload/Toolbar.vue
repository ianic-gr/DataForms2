<script setup lang="ts">
import { computed, ref } from "vue";

interface Props {
  previewFiles: Record<string, any>[];
  errors: any;
}
const props = defineProps<Props>();

const emit = defineEmits(["deleteFiles"]);

const uploadedFiles = defineModel<Record<string, any>[]>("uploadedFiles", {
  required: true,
});

const loading = ref(false);
const selectAllStatus = ref(false);
const selected = ref<Record<string, any>[]>([]);

const imageList = computed(() => {
  return [...props.previewFiles, ...uploadedFiles.value];
});

const selectAll = computed({
  get: () => {
    return (
      imageList.value &&
      imageList.value.length &&
      selected.value.length === imageList.value.length
    );
  },
  set: (v) => {
    selectAllStatus.value = Boolean(v);
    selected.value = v ? [...imageList.value] : [];
  },
});

const deleteRows = async () => {
  loading.value = true;

  try {
    uploadedFiles.value = uploadedFiles.value.filter((item) => {
      return !selected.value.map((s) => s.id).includes(item.id);
    });

    emit("deleteFiles", selected.value);

    selected.value = [];
    selectAllStatus.value = false;
  } catch (error) {
    console.error(error);
  }

  loading.value = false;
};
</script>

<template>
  <v-card color="grey-lighten-4" class="mb-4" rounded="0" flat>
    <v-toolbar :color="errors ? 'error' : ''" rounded density="compact">
      <v-checkbox
        v-model="selectAll"
        class="ms-1"
        hide-details
        :indeterminate="Boolean(!selectAll && selected.length)"
      />

      <v-toolbar-title v-if="selected.length">
        {{ selected.length }} imagesSelected
      </v-toolbar-title>

      <v-toolbar-title v-else-if="errors">
        {{ errors }}
      </v-toolbar-title>

      <v-spacer />

      <v-btn v-if="selected.length" :loading="loading" icon @click="deleteRows">
        <v-icon>mdi-delete</v-icon>
      </v-btn>

      <slot name="upload" />
    </v-toolbar>
    <FileUploadGallery
      v-model:selected="selected"
      :images="previewFiles"
      :uploaded-files="uploadedFiles"
    />
  </v-card>
</template>
