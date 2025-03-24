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
  active: {
    type: Boolean,
    default: false,
  },
});

const store = inject("dataformsStore");
const currentForm = ref({});
const map = ref(null);
const marker = ref(null);

const initMap = () => {
  currentForm.value = store.getCurrentForm(props.id);

  // Create a map centered at a specific location
  map.value = L.map("map").setView([40.6212503, 22.9048278], 13);

  // Add a tile layer (e.g., OpenStreetMap)
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map.value);

  // Create a draggable marker at a specific location
  marker.value = L.marker([40.6212503, 22.9048278], { draggable: true }).addTo(map.value);

  // Listen for the dragend event to get the new position
  marker.value.on("dragend", function (event) {
    const { lat, lng } = marker.value.getLatLng();

    currentForm.value.binder.latitude = lat;
    currentForm.value.binder.longitude = lng;
  });
};

const installMap = () => {
  // Create and append the Leaflet stylesheet
  const linkTag = document.createElement("link");
  linkTag.setAttribute("rel", "stylesheet");
  linkTag.setAttribute("href", "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
  document.head.appendChild(linkTag);

  // Create and append the Leaflet script
  const scriptTag = document.createElement("script");
  scriptTag.setAttribute("src", "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js");
  document.head.appendChild(scriptTag);

  scriptTag.onload = () => initMap();
};

const setPoint = (latitude, longitude) => {
  if (!latitude || !longitude) return;

  const newLatLng = new L.LatLng(latitude, longitude);
  marker.value.setLatLng(newLatLng);
  map.value.setView(newLatLng, 13);
};

watch(
  () => props.active,
  async () => {
    await nextTick();

    if (!map.value) return;

    map.value.invalidateSize();
  },
  { immediate: true }
);

watch(
  () => currentForm.value.binder,
  async ({ latitude, longitude }) => {
    await nextTick();

    setPoint(latitude, longitude);
  },
  { deep: true }
);

onMounted(async () => {
  await nextTick();

  installMap();
});
</script>

<template>
  <div class="dynamic-map-component">
    <div id="map" class="mb-8" style="height: 400px" />
    <DataFormInput :form-id="id" :items="fields" />
  </div>
</template>
