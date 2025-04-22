import { defineAsyncComponent } from "vue";

export default {
  install(app) {
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
