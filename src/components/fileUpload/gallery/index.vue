<script setup lang="ts">
const dataformsPluginOptions = inject<Record<string, any>>("dataformsPluginOptions");

interface Props {
  images: Record<string, any>[];
  uploadedFiles: Record<string, any>[];
}
defineProps<Props>();

const selected = defineModel<(Record<string, any> | Blob)[]>("selected", {
  required: true,
});
</script>

<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col v-for="(img, i) in images" :key="i" class="position-relative" cols="12" sm="4" md="3" lg="2">
          <div class="position-relative ma-1">
            <v-avatar color="white" class="position-absolute" style="z-index: 9; top: 4px">
              <v-checkbox v-model="selected" hide-details color="primary" :value="img" />
            </v-avatar>
          </div>

          <FileUploadGalleryThumbnail :img="img.file" />
        </v-col>
        <v-col v-for="img in uploadedFiles" :key="img.id" class="position-relative" cols="12" sm="4" md="3" lg="2">
          <div class="position-relative ma-1">
            <v-avatar color="white" class="position-absolute" style="z-index: 9; top: 4px" loading>
              <v-checkbox v-model="selected" hide-details color="primary" :value="img" />
            </v-avatar>

            <v-avatar class="position-absolute" style="z-index: 9; top: 4px; right: 0">
              <v-tooltip text="Image has not uploaded yet" location="top">
                <template #activator="{ props }">
                  <v-icon v-bind="props" color="warning" :icon="dataformsPluginOptions?.icons.fileUpload.upload" />
                </template>
              </v-tooltip>
            </v-avatar>
          </div>

          <FileUploadGalleryThumbnail :uploaded="false" :img="img.file" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
