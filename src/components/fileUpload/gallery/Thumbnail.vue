<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";

interface Props {
  img: any;
  uploaded?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  uploaded: true,
});

const isImage = ref(true);
const imageUrl = ref();
const fileError = ref(false);

onMounted(async () => {
  if (!props.uploaded) {
    isImage.value = props.img.type.startsWith("image/");
    if (isImage.value) {
      imageUrl.value = URL.createObjectURL(props.img);
    }
  } else {
    try {
      const res = await fetch(props.img);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const blob = await res.blob();
      isImage.value = blob.type.startsWith("image/");
      if (isImage.value) {
        imageUrl.value = URL.createObjectURL(blob);
      }
    } catch (e) {
      console.error("Fetch failed:", e);
      fileError.value = true;
      isImage.value = false;
    }
  }
});

onUnmounted(() => {
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value);
  }
});
</script>

<template>
  <div>
    <v-dialog v-if="uploaded && !fileError" max-width="1100">
      <template #activator="{ props: activatorProps }">
        <v-card v-if="isImage" v-bind="activatorProps">
          <v-card-text class="pa-0">
            <v-img :src="imageUrl" alt="" aspect-ratio="1" cover />
          </v-card-text>
        </v-card>

        <v-card v-else>
          <v-card-text>
            <div
              class="d-flex align-center justify-center flex-column w-100 h-100"
              style="aspect-ratio: 1"
            >
              <v-icon size="50"> mdi-file </v-icon>
              <br />
              <div class="text-truncate w-100">
                {{ img }}
              </div>
            </div>
          </v-card-text>
        </v-card>
      </template>

      <template #default="{ isActive }">
        <v-card rounded="xl">
          <v-card-title
            class="d-flex justify-space-between align-center"
            style="min-height: 70px"
          >
            <div class="text-medium-emphasis ps-2">
              {{ img }}
            </div>

            <v-btn
              icon="mdi-close"
              variant="text"
              color="dark"
              @click="isActive.value = false"
            />
          </v-card-title>

          <v-card-text class="pa-0 overflow-auto">
            <v-img :src="imageUrl" />
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
    <div v-else>
      <v-card v-if="isImage">
        <v-card-text class="pa-0">
          <v-img :src="imageUrl" alt="" aspect-ratio="1" cover />
        </v-card-text>
      </v-card>

      <v-card v-else>
        <v-card-text>
          <div
            class="d-flex align-center justify-center flex-column w-100 h-100"
            style="aspect-ratio: 1"
          >
            <v-icon v-if="fileError" size="50"> mdi-file-document-remove </v-icon>
            <v-icon v-else size="50"> mdi-file </v-icon>
            <br />
            <div class="text-truncate w-100">
              {{ imageUrl }}
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
