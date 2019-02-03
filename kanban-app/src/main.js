import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ErrorBoundary from "./ErrorBoundary.vue";

Vue.component(ErrorBoundary.name, ErrorBoundary);

Vue.config.productionTip = false;
Vue.config.errorHandler = (err, vm, info) => {
  console.error("errorHandler err: ", err);
  console.error("errorHandler vm: ", vm);
  console.error("errorHandler info:", info);
};
Vue.config.performance = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
