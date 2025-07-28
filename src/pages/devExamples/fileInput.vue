<script setup>
const api = {
  rows: [
    {
      title: "Multiple File Input",
      input: [
        {
          multipleFile: {
            type: "FileInput",
            options: {
              label: "Files",
              prependIcon: "mdi-file",
              multiple: true,
            },
            validation: {
              mimes: "image/*",
            },
            events: {
              onDelete: (item) => {
                console.log(item);
              },
            },
          },
        },
      ],
    },
    {
      title: "Single File Input",
      input: [
        {
          singleFile: {
            type: "FileInput",
            options: {
              label: "File",
              prependIcon: "mdi-file",
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
};
</script>

<template>
  <DataForm id="fileInput-form" :api="api" />
</template>
