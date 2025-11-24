// src/i18n.js
import { createI18n } from "vue-i18n";
import { el as elMessages, en as enMessages } from "../lib/locale";

const messages = {
  el: {
    $dataforms: {
      ...elMessages,
    },
  },
  en: {
    $dataforms: {
      ...enMessages,
    },
  },
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  legacy: false,
  messages,
});

export default i18n;
