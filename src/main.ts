import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { GDialog, plugin as dialogPlugin } from "gitart-vue-dialog";
import "gitart-vue-dialog/dist/style.css";

createApp(App)
  .use(store)
  .component("GDialog", GDialog)
  .use(dialogPlugin)
  .use(router)
  .mount("#app");
