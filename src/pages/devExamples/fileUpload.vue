<script setup>
const multiplePreview = ref([
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3YNRu7aelgluNIXT1OXPXdS5Xr2TbFpPf8Q&s",
    id: 1,
    deletable: true,
  },
  {
    image:
      "https://www.pdsa.org.uk/media/7646/golden-retriever-gallery-2.jpg?anchor=center&mode=crop&quality=100&height=500&bgcolor=fff&rnd=133020229510000000",
    id: 2,
    deletable: true,
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
              deleteButton: {
                text: "Delete",
                prependIcon: "mdi-delete",
              },
              preview: multiplePreview.value,
            },
            events: {
              onDelete: (item) => {
                multiplePreview.value = multiplePreview.value.filter(
                  (x) => x.id !== item.id
                );
              },
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
              label: "File",
              prependIcon: "mdi-file",
              deleteButton: {
                text: "Delete",
                prependIcon: "mdi-delete",
              },
              preview: {
                image:
                  "https://13630656.rocketcdn.me/wp-content/uploads/2020/01/Golden4.jpg.webp",
                id: 1,
                deletable: true,
              },
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
