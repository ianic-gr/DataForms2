<script setup>
const props = defineProps({
  id: {
    required: true,
    type: String,
  },
  fields: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

const store = inject("dataformsStore");
const currentForm = ref({});
const map = ref(null);
const marker = ref(null);

const initMap = () => {
  // Create a map centered at a specific location
  map.value = L.map("map").setView([40.6212503, 22.9048278], 13);

  // Add a tile layer (e.g., OpenStreetMap)
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map.value);

  // Create a draggable marker at a specific location
  marker.value = L.marker([40.6212503, 22.9048278], { draggable: true }).addTo(
    map.value
  );

  // Listen for the dragend event to get the new position
  marker.value.on("dragend", function (event) {
    const { lat, lng } = marker.value.getLatLng();

    currentForm.value.binder.latitude = lat;
    currentForm.value.binder.longitude = lng;
  });
};

watch(
  () => currentForm.value.binder,
  ({ latitude, longitude }) => {
    if (!latitude || !longitude) return;

    var newLatLng = new L.LatLng(latitude, longitude);
    marker.value.setLatLng(newLatLng);
    map.value.setView(newLatLng, 13);
  },
  { deep: true }
);

onMounted(async () => {
  await nextTick();
  currentForm.value = store.getCurrentForm(props.id);

  initMap();
});
</script>

<template>
  <div id="map" class="mb-8" style="height: 400px"></div>
  <DataFormInput :formId="id" :items="fields"></DataFormInput>
</template>
