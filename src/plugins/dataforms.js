import { defineAsyncComponent } from "vue";

export default {
  install(app) {
    // Register a global component
    app.component(
      "DataForm",
      defineAsyncComponent(() => import("../components/form"))
    );
  },
};
