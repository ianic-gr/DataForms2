// Plugins
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Fonts from "unplugin-fonts/vite";
import Layouts from "vite-plugin-vue-layouts-next";
import Vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import * as path from "path";

// Utilities
import { BuildEnvironmentOptions, defineConfig, CSSOptions } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Determine the base URL for GitHub Pages or local development

  const isProduction = mode === "production";
  const base = isProduction ? "/DataForms2/" : "/"; // Replace with your repository name

  // Check for build type
  const isPageBuild = process.env.BUILD_TYPE === "pages";

  const css: CSSOptions = {
    preprocessorOptions: {
      sass: {
        api: "modern-compiler",
      },
      scss: {
        api: "modern-compiler",
      },
    },
  };

  let buildOptions: BuildEnvironmentOptions = {
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, "src/plugins/dataforms.js"),
      formats: ["es", "cjs"],
      name: "Dataforms 2",
      fileName: "dataforms",
    },
    rollupOptions: {
      external: ["vue", "vuetify", "pinia", "moment"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  };

  if (isPageBuild) {
    buildOptions = {
      cssCodeSplit: false,
      rollupOptions: {
        input: path.resolve(__dirname, "index.html"), // Application entry point
        output: {
          globals: {
            vue: "Vue",
          },
        },
      },
    };
  }

  return {
    base, // Set base path for deployment
    plugins: [
      VueRouter({
        dts: "src/typed-router.d.ts",
      }),
      Layouts(),
      AutoImport({
        imports: [
          "vue",
          VueRouterAutoImports,
          {
            pinia: ["defineStore", "storeToRefs"],
          },
        ],
        dts: "src/auto-imports.d.ts",
        eslintrc: {
          enabled: true,
        },
        vueTemplate: true,
      }),
      Components({
        dts: "src/components.d.ts",
        deep: true,
        directoryAsNamespace: true,
      }),
      Vue({
        template: { transformAssetUrls },
      }),
      Vuetify({
        autoImport: true,
        styles: {
          configFile: "src/styles/settings.scss",
        },
      }),
      Fonts({
        google: {
          families: [
            {
              name: "Roboto",
              styles: "wght@100;300;400;500;700;900",
            },
          ],
        },
      }),
    ],
    optimizeDeps: {
      exclude: [
        "vuetify",
        "vue-router",
        "unplugin-vue-router/runtime",
        "unplugin-vue-router/data-loaders",
        "unplugin-vue-router/data-loaders/basic",
      ],
    },
    define: { "process.env": {} },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
    server: {
      port: 3000,
    },
    css,
    build: {
      ...buildOptions,
      css,
    },
  };
});
