<template>
  <div>
    <markdown-preview :source="markdown" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import MarkdownPreview from "@uivjs/vue-markdown-preview";
import "@uivjs/vue-markdown-preview/markdown.css";

const markdown = `
# DataForms2

DataForms2 is a Vue 3 plugin designed to simplify the creation of forms using Vuetify 3 components. This plugin provides a flexible way to define form fields, validation rules, and submission actions, making it easy to build responsive and dynamic forms in your Vue applications.

## Features

- **Responsive Layout**: Create forms that adapt to different screen sizes effortlessly.
- **Dynamic Input Fields**: Easily define input fields with various types, including text, email, select, and text area.
- **Validation Support**: Built-in validation rules for common scenarios (e.g., required fields, email format).
- **Icon Support**: Customize inputs with icons for improved user experience.
- **Submit Handling**: Define submission logic with callback functions to handle form data.

## Installation

To install the DataForms2 plugin, run the following command:

\`\`\`bash
npm install @ianicdev/dataforms2
\`\`\`

## Nuxt.js Integration

For Nuxt.js applications, you need to create a plugin file to register DataForms2. Follow these steps:

1. Create a file named \`dataforms.js\` in your \`plugins\` directory.
2. Add the following code to the file:

\`\`\`js
import DataForms from "@ianicdev/dataforms2";
import "@ianicdev/dataforms2/styles.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(DataForms);
});
\`\`\`

3. Ensure your Nuxt app recognizes the plugin by adding it to your \`nuxt.config.js\`:

\`\`\`js
export default {
  plugins: ["~/plugins/dataforms.js"],
};
\`\`\`

## Usage

### Basic Example

Here’s a simple example of how to use the \`DataForm\` component with a contact form:

\`\`\`js
const api = {
  rows: [
    {
      input: [
        {
          name: {
            options: {
              label: "First name",
              prependIcon: "mdi-account",
              "persistent-hint": true,
              clearable: true,
            },
            validation: "required",
          },
          email: {
            options: {
              default: "support@ianic.gr",
              label: "Email",
              prependIcon: "mdi-mail",
            },
            validation: "required|min:4|max:24|email",
            tooltip: {
              position: "bottom",
              text: "lorem ipsun",
            },
          },
          _responsive: {
            sm: 12,
            md: 6,
          },
        },
        {
          surname: {
            options: {
              label: "Last name",
              prependIcon: "mdi-account",
            },
          },
          phone: {
            options: {
              label: "Phone",
              prependIcon: "mdi-phone",
            },
            validation: "required",
          },
          _responsive: {
            sm: 12,
            md: 6,
          },
        },
      ],
    },
    {
      input: [
        {
          deadline: {
            type: "selects",
            options: {
              label: "When do you need this project?",
              items: [
                {
                  text: "In 1 - 2 Months",
                  value: "normal_client",
                },
                {
                  text: "Now!",
                  value: "now",
                },
                {
                  text: "Yesterday!!!",
                  value: "yesterday",
                },
              ],
            },
            validation: "required",
          },
        },
      ],
    },
    {
      input: [
        {
          comments: {
            type: "textArea",
            options: {
              label: "Tell us your thoughts",
            },
            validation: "required",
          },
        },
      ],
    },
  ],
  submit: {
    title: "Message",
    color: "primary",
    options: {
      rounded: true,
    },
    icon: {
      symbol: "mdi-heart",
      options: {
        small: true,
        color: "red",
        class: "mr-2",
      },
    },
    click(data) {
      console.log("data: ", data);
    },
  },
};

<template>
  <DataForm id="contact-form" :api="api" />
</template>
\`\`\`

## API Structure

The \`api\` object defines the structure of your form, including:

- **rows**: An array of form rows, each containing an array of input fields.
- **input**: An object representing each form field with options and validation rules.
- **submit**: An object defining the submission button's properties, such as title, color, options, icon, and a click handler.

## License

This project is licensed under the MIT License.
`;

export default defineComponent({
  data() {
    return {
      markdown,
    };
  },
  components: {
    MarkdownPreview,
  },
});
</script>
