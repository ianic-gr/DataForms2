<script setup>
const multiplePreview = ref([
  {
    id: 14,
    file: "https://hips.hearstapps.com/hmg-prod/images/call-duck-695733614-67f4fc458cf92.jpg?crop=0.668xw:1.00xh;0.181xw,0&resize=980:*",
  },
  {
    id: 45,
    file: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Bucephala-albeola-010.jpg",
  },
  {
    id: 46,
    file: "https://media.4-paws.org/a/f/4/7/af47ae6aa55812faa4d7fd857a6e283a8c8226bc/VIER%20PFOTEN_2019-07-18_013-2890x2000-1920x1329.jpg",
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
