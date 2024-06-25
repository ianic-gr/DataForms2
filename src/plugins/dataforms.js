import Form from "../components/form";

export default {
  install(app, options) {
    // Add a global method or property
    app.config.globalProperties.$myMethod = (message) => {
      console.log(`My Plugin: ${message}`);
    };

    // Register a global component
    app.component("DataForm", Form);

    // Register a global directive
    app.directive("my-directive", {
      mounted(el, binding) {
        el.style.color = binding.value;
      },
    });

    // Add a mixin
    app.mixin({
      created() {
        // console.log("Component Created: shit" + this.$options.name);
      },
    });
  },
};
