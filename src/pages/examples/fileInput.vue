<script setup>
const api = {
  rows: [
    {
      title: 'Multiple File Input',
      input: [
        {
          multipleFile: {
            type: "FileInput",
            options: {
              label: "Files",
              prependIcon: 'mdi-file',
              multiple: true,
              deleteButton: {
                text: 'Delete',
                icon: 'mdi-delete'
              },
              preview: [
                {
                  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3YNRu7aelgluNIXT1OXPXdS5Xr2TbFpPf8Q&s',
                  id: 1,
                  deletable: true,
                },
                {
                  image: 'https://www.pdsa.org.uk/media/7646/golden-retriever-gallery-2.jpg?anchor=center&mode=crop&quality=100&height=500&bgcolor=fff&rnd=133020229510000000',
                  id: 2
                }
              ]
            },
            events: {
              onDelete: (item) => {
                console.log(item)
              }
            }
          },
        },
      ],
    },
    {
      title: 'Single File Input',
      input: [
        {
          singleFile: {
            type: "FileInput",
            options: {
              label: "File",
              prependIcon: 'mdi-file',
              deleteButton: {
                text: 'Delete',
                icon: 'mdi-delete'
              },
              preview:  {
                image: 'https://13630656.rocketcdn.me/wp-content/uploads/2020/01/Golden4.jpg.webp',
                id: 1,
                deletable: true,
              },
            },
            events: {
              onDelete: (item) => {
                console.log(item)
              }
            }
          },
        },
      ],
    },
  ],
  submit: {
    title: "Upload",
    color: "primary",
    options: {
      rounded: true,
    },
    icon: {
      symbol: "mdi-upload",
      options: {
        small: true,
        color: "white",
        class: "mr-2",
      },
    },
    click(data) {
      console.log("data: ", data);
    },
  },
}
</script>

<template>
  <DataForm id="fileInput-form" :api="api" />
</template>
