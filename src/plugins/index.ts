/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from "./vuetify";
import dataforms from "./dataforms";
import pinia from "../stores";
import router from "../router";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  app.use(vuetify).use(dataforms).use(router).use(pinia);
}