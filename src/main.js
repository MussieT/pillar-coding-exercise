import { createApp } from "vue";

import App from "./App.vue";
import router from "./router/index.js";
import { default_apollo_client, entity_apollo_client } from "./plugins/apollo";
import { ApolloClients } from "@vue/apollo-composable";
// import { VueReCaptcha } from "vue-recaptcha-v3";
import modal from "@/plugins/modal";

import VueDOMPurifyHTML from "vue-dompurify-html";
import i18n from "@/plugins/i18n";
import "@/helpers/rules";
import "./index.css";

const app = createApp(App)
  .use(router)
  .provide(ApolloClients, {
    default: default_apollo_client,
    entity: entity_apollo_client,
  })

  // .use(VueReCaptcha, { siteKey: import.meta.env.VITE_RECAPATCHA_SITE_KEY })
  .use(modal)
  .use(VueDOMPurifyHTML)
  .use(i18n)
  .mount("#app");
