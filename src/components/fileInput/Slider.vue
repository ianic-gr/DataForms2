<script setup>
const props = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["deleteItem"]);
const imgIndex = ref();

const deleteItem = (item) => {
  emit("deleteItem", item);
};
</script>

<template>
  <v-card
    v-if="props.options.preview && props.options.preview.length"
    class="preview-slider mt-8"
    width="500"
    rounded="lg"
  >
    <v-carousel v-model="imgIndex" height="300" show-arrows="hover">
      <v-carousel-item
        v-for="(item, n) in props.options.preview"
        :key="`img-${n}`"
        :src="item.image"
        cover
      />
    </v-carousel>

    <div v-if="props.options.preview?.[imgIndex]?.deletable">
      <v-btn
        class="preview-slider__delete"
        color="error"
        size="small"
        variant="flat"
        rounded="xl"
        v-bind="options.deleteButton"
        @click="deleteItem(props.options.preview[imgIndex])"
      />
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.preview-slider {
  &:hover &__delete {
    visibility: visible;
    opacity: 100%;
  }

  &__delete {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    visibility: hidden;
    opacity: 0;
    z-index: 1;
  }
}
</style>
