import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import store from "./../store/";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/camera/:id",
    name: "CameraPage",
    component: () => import("../views/Camera.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.auth.isAuthenticated) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
