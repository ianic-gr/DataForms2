<script setup>
const props = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["deleteItem"]);
const dialog = ref(false);
const previewImageTitle = computed(() => {
  if (!props.options.preview) return;
  return props.options.preview.title
    ? props.options.preview.title
    : props.options.preview.image;
});
const deleteButton = computed(() => {
  return {
    text: props.options?.deleteButton?.text,
    icon: props.options?.deleteButton?.icon,
  };
});

const deleteItem = (item) => {
  emit("deleteItem", item);
};
</script>

<template>
  <div id="fileinput-single">
    <v-card v-if="props.options.preview" class="preview-slider mt-8" width="500">
      <v-btn
        v-if="props.options.preview.deletable"
        class="preview-slider__delete"
        color="error"
        size="small"
        variant="flat"
        rounded="xl"
        v-bind="options.deleteButton"
        @click="deleteItem(props.options.preview)"
      />
      <v-img
        :src="props.options.preview.image"
        width="500"
        height="300"
        class="grey darken-4 cursor-pointer"
        @click="dialog = true"
      />
      <v-card-title>
        <small>
          Preview:
          <a :href="props.options.preview.image" target="_blank">
            {{ previewImageTitle }}
          </a>
        </small>
      </v-card-title>
    </v-card>
    <v-dialog v-if="props.options.preview" v-model="dialog" max-width="1200">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ previewImageTitle }}
          <v-btn class="float-right" icon elevation="0" @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-img
          contain
          :src="props.options.preview.image"
          class="grey darken-4"
          max-height="700"
          max-width="1200"
        />

        <v-divider />
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped lang="scss">
.preview-slider {
  &:hover &__delete {
    visibility: visible;
    opacity: 100%;
  }

  &__delete {
    position: absolute;
    top: 0;
    right: 0;
    visibility: hidden;
    opacity: 0;
    z-index: 1;
  }
}
</style>
