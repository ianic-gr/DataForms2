<script setup>
const props = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
})

const emit = defineEmits(['deleteItem'])
const onboarding = ref(0)
const length = computed(() => props.options.preview.length)
const deleteButton = computed(() => {
  return {
    text: props.options?.deleteButton?.text,
    icon: props.options?.deleteButton?.icon,
  }
})

const next = () => {
  onboarding.value =
      onboarding.value + 1 === length.value ? 0 : onboarding.value + 1;
}
const prev = () => {
  onboarding.value =
      onboarding.value - 1 < 0 ? length.value - 1 : onboarding.value - 1;
}
const deleteItem = (item) => {
  emit("deleteItem", item);
}
</script>

<template>
  <v-card
    v-if="props.options.preview && props.options.preview.length"
    class="mt-8"
    width="500"
    flat
    tile
  >
    <v-window class="preview-slider" v-model="onboarding" vertical>
      <v-window-item v-for="(item, n) in props.options.preview" :key="`card-${n}`">
        <!-- Delete Button Slider -->
        <v-row v-if="item.deletable">
          <v-btn
            class="preview-slider__delete"
            color="error"
            small
            :fab="!deleteButton.text"
            :tile="!deleteButton.text"
            @click="deleteItem(item)"
          >
            {{ deleteButton.text }}
            <v-icon
              :class="deleteButton.text ? 'ml-1' : ''"
              :small="Boolean(deleteButton.text)"
              >{{ deleteButton.icon }}</v-icon
            >
          </v-btn>
        </v-row>
        <!-- //Delete Button Slider -->
        <v-card color="grey">
          <v-row class="fill-height" align="center" justify="center">
            <v-img
              contain
              :src="item.image"
              class="grey darken-4"
              width="500"
              height="300"
            ></v-img>
          </v-row>
        </v-card>
      </v-window-item>
    </v-window>

    <v-card-actions class="justify-space-between">
      <v-btn text @click="prev">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-item-group v-model="onboarding" class="text-center" mandatory>
        <v-item
          v-for="n in length"
          :key="`btn-${n}`"
          v-slot="{ active, toggle }"
        >
          <v-btn :input-value="active" icon @click="toggle">
            <v-icon>mdi-record</v-icon>
          </v-btn>
        </v-item>
      </v-item-group>
      <v-btn text @click="next">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
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
    top: 0;
    right: 0;
    visibility: hidden;
    opacity: 0;
    z-index: 1;
  }
}
</style>
