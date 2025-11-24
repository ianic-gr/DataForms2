import { defineAsyncComponent } from "vue";
import defu from "defu";

export default {
  install(app, options) {
    app.provide(
      "pluginOptions",
      defu(options, {
        icons: {
          alert: "mdi-alert-circle",
          close: "mdi-close",
          eye: "mdi-eye",
          eyeOff: "mdi-eye-off",
          information: "mdi-information",
          fileUpload: {
            file: "mdi-file",
            upload: "mdi-upload-circle",
            documentRemove: "mdi-file-document-remove",
            delete: "mdi-delete",
          },
          alias: {
            translate: "mdi-translate-variant",
          },
        },
      })
    );

    // Register a global component
    app.component(
      "DataForm",
      defineAsyncComponent(() => import("../components/form/index.vue"))
    );

    app.component(
      "DataFormInput",
      defineAsyncComponent(() => import("../components/subLayout/input/index.vue"))
    );

    app.component(
      "DataFormInputErrors",
      defineAsyncComponent(() => import("../components/subLayout/input/errors/index.vue"))
    );
  },
};
