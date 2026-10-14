<script setup lang="ts">
  const dataformsPluginOptions = inject<Record<string, any>>("dataformsPluginOptions");

  interface Props {
    img: any;
    uploaded?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    uploaded: true,
  });

  const dialog = ref();
  const isImage = ref(true);
  const imageUrl = ref();
  const fileError = ref(false);

  const ZOOM_STEP = 0.25;
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 3;

  const scale = ref(1);
  const rotation = ref(0);

  const transformStyle = computed(() => ({
    transform: `scale(${scale.value}) rotate(${rotation.value}deg)`,
  }));

  const zoomIn = () => {
    scale.value = Math.min(MAX_ZOOM, +(scale.value + ZOOM_STEP).toFixed(2));
  };

  const zoomOut = () => {
    scale.value = Math.max(MIN_ZOOM, +(scale.value - ZOOM_STEP).toFixed(2));
  };

  const rotateCW = () => {
    rotation.value += 90;
  };

  const rotateCCW = () => {
    rotation.value -= 90;
  };

  const reset = () => {
    scale.value = 1;
    rotation.value = 0;
  };

  watch(dialog, (newVal) => {
    if (newVal) {
      reset();
    }
  });

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
    reset();
    if (imageUrl.value) {
      URL.revokeObjectURL(imageUrl.value);
    }
  });
</script>

<template>
  <div>
    <v-dialog v-if="isImage && !fileError" v-model="dialog" max-width="1000">
      <template #activator="{ props: activatorProps }">
        <v-card v-bind="activatorProps">
          <v-card-text class="pa-0">
            <v-img :src="imageUrl" alt="" aspect-ratio="1" cover />
          </v-card-text>
        </v-card>
      </template>

      <template #default="{ isActive }">
        <v-card rounded="xl">
          <v-card-title class="d-flex justify-space-between align-center" style="min-height: 70px">
            <v-btn-group variant="tonal" rounded="pill" divided>
              <v-btn :icon="dataformsPluginOptions?.icons.fileUpload.gallery.plus" @click="zoomIn()" />
              <v-btn :icon="dataformsPluginOptions?.icons.fileUpload.gallery.rotateCCW" @click="rotateCCW()" />
              <v-btn :icon="dataformsPluginOptions?.icons.fileUpload.gallery.rotateCW" @click="rotateCW()" />
              <v-btn :icon="dataformsPluginOptions?.icons.fileUpload.gallery.minus" @click="zoomOut()" />
            </v-btn-group>
            <v-btn
              :icon="dataformsPluginOptions?.icons.close"
              variant="text"
              size="small"
              color="dark"
              @click="isActive.value = false"
            />
          </v-card-title>

          <v-card-text class="bg-black pa-0 overflow-auto">
            <v-carousel direction="vertical" height="80vh" :continuous="false" :show-arrows="false" hide-delimiters>
              <v-carousel-item color="black">
                <v-img :src="imageUrl" class="gallery-image" :style="transformStyle" />
              </v-carousel-item>
            </v-carousel>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>

    <v-card v-else>
      <v-card-text>
        <div class="d-flex align-center text-center justify-center flex-column w-100 h-100" style="aspect-ratio: 1">
          <v-icon v-if="fileError" size="50" :icon="dataformsPluginOptions?.icons.fileUpload.documentRemove" />
          <v-icon v-else size="50" :icon="dataformsPluginOptions?.icons.fileUpload.file" />
          <br>
          <div class="text-truncate w-100">
            {{ imageUrl || img.name }}
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
  .gallery-image {
    transition: transform 0.3s ease;
    will-change: transform;
    transform-origin: center center;
  }
</style>
