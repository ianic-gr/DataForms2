<script setup>
const multiplePreview = ref([
  {
    id: 14,
    file: "https:\/\/smartville-api.lndo.site\/kos\/tenancy\/assets\/water_meter_images\/14\/GvffMsTXIAAM8KB.jpeg",
  },
  {
    id: 45,
    file: "https:\/\/smartville-api.lndo.site\/kos\/tenancy\/assets\/water_meter_images\/45\/Screenshot-From-2025-06-06-13-57-32.png",
  },
  {
    id: 46,
    file: "https:\/\/smartville-api.lndo.site\/kos\/tenancy\/assets\/water_meter_images\/46\/Screenshot-From-2025-06-27-11-54-16.png",
  },
]);

const api = computed(() => ({
  rows: [
    {
      title: "Multiple File Upload",
      input: [
        {
          multipleFile: {
            type: "FileUpload",
            options: {
              label: "Files",
              prependIcon: "mdi-file",
              multiple: true,
            },
            preview: multiplePreview.value,
            onDelete: (v) => {
              multiplePreview.value = multiplePreview.value.filter((item) => {
                console.log(item.id, v.id);
                return item.id !== v.id;
              });
            },
            validation: {
              mimes: "image/*",
            },
          },
        },
      ],
    },
    {
      title: "Single File Upload",
      input: [
        {
          singleFile: {
            type: "FileUpload",
            options: {
              label: "KML",
              clearable: true,
            },
            preview: null,
            validation: {
              mimes: [
                "application/zip",
                "text/xml",
                "application/xml",
                "text/xsl",
                "application/vnd.google-earth.kml+xml",
                "application/vnd.google-earth.kmz",
              ],
            },
          },
        },
      ],
    },
  ],
  submit: {
    options: {
      text: "Upload",
      color: "primary",
      rounded: true,
      prependIcon: "mdi-upload",
    },
    click(data) {
      console.log("data: ", data);
    },
  },
}));
</script>

<template>
  <DataForm id="fileInput-form" :api="api" />
</template>
