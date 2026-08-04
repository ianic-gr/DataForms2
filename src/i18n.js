// src/i18n.js
import { createI18n } from "vue-i18n";
import { el as elMessages, en as enMessages, de as deMessages, pt as ptMessages } from "../lib/locale";

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
  de: {
    $dataforms: {
      ...deMessages,
    },
  },
  pt: {
    $dataforms: {
      ...ptMessages,
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
