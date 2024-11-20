// Plugins
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Fonts from "unplugin-fonts/vite";
import Layouts from "vite-plugin-vue-layouts";
import Vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import * as path from "path";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Determine the base URL for GitHub Pages or local development
  const isProduction = mode === "production";
  const base = isProduction ? "/DataForms2/" : "/"; // Replace with your repository name

  // Check for build type
  const isPageBuild = process.env.BUILD_TYPE === "pages";

  const css = {
    preprocessorOptions: {
      sass: {
        api: "modern-compiler",
      },
    },
  };

  let buildOptions = {
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, "src/plugins/dataforms.js"),
      formats: ["es", "cjs"],
      name: "Dataforms 2",
      fileName: "dataforms",
    },
    rollupOptions: {
      external: ["vue", "vuetify", "pinia"],
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
      Vue({
        template: { transformAssetUrls },
      }),
      Vuetify({
        autoImport: true,
        styles: {
          configFile: "src/styles/settings.scss",
        },
      }),
      Components({
        dts: "src/components.d.ts",
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
      AutoImport({
        imports: [
          "vue",
          {
            "vue-router/auto": ["useRoute", "useRouter"],
          },
        ],
        dts: "src/auto-imports.d.ts",
        eslintrc: {
          enabled: true,
        },
        vueTemplate: true,
      }),
    ],
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
