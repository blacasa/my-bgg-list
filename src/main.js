import Vue from "vue";
import VueRouter from "vue-router";
import App from "./My-bgg-list.vue";
import BootstrapVue from "bootstrap-vue";
import "./registerServiceWorker.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueRx from "vue-rx";

Vue.use(VueRx);
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.config.productionTip = false;

import games from "./components/games.vue";
import lists from "./components/lists.vue";
import sync from "./components/sync.vue";

const routes = [
  { path: "/", component: games },
  { path: "/games/:list?", name: "games", component: games },
  { path: "/lists", component: lists },
  { path: "/sync", component: sync }
];
const router = new VueRouter({
  routes // short for `routes: routes`
});

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
