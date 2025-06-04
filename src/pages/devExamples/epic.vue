<script setup>
const api = {
  rows: [
    {
      title: "Epic with Text",
      input: [
        {
          epic: {
            type: "epic",
            options: {
              label: "Pop",
              text: `
                    <h1>Lorem ipsum dolor sit amet,</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum pulvinar nibh dignissim dignissim. Proin eget sem tempus, efficitur sapien non, iaculis mi. Nullam id ipsum tortor. Mauris porta sem vel lorem ultricies suscipit.</p>
                    <p>Maecenas sed ante id tortor varius tempus. <b>Donec non elit at ipsum lacinia faucibus.</b> Fusce consequat ut quam ullamcorper ornare. Curabitur suscipit blandit nulla eu pretium.</p>
                    `,
            },
          },
        },
      ],
    },
    {
      title: "Epic with HTML",
      input: [
        {
          epic: {
            type: "epic",
            options: {
              label: "Pop",
              html: `
                    <h1>Lorem ipsum dolor sit amet,</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum pulvinar nibh dignissim dignissim. Proin eget sem tempus, efficitur sapien non, iaculis mi. Nullam id ipsum tortor. Mauris porta sem vel lorem ultricies suscipit.</p>
                    <p>Maecenas sed ante id tortor varius tempus. <b>Donec non elit at ipsum lacinia faucibus.</b> Fusce consequat ut quam ullamcorper ornare. Curabitur suscipit blandit nulla eu pretium.</p>
                    `,
            },
          },
        },
      ],
    },
  ],
  submit: {
    options: {
      text: "Send Message",
      color: "primary",
    },
    click(data) {
      console.log("data: ", data);
    },
  },
};
</script>

<template>
  <DataForm id="epic" :api="api" />
</template>
