import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/createTask",
    name: "createTask",
    component: () => import("../views/CreateView.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: import("../views/SettingView.vue"),
  },
  {
    path: "/item/:id",
    name: "item",
    component: import("../views/ItemView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
