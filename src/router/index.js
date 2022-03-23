import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "首頁",
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {
      title: "關於",
    },
  },
  {
    path: "/test01",
    name: "Test01",
    component: () => import("../views/Test01.vue"),
    meta: {
      title: "測試01",
    },
  },
  {
    path: "/test02",
    name: "Test02",
    component: () => import("../views/Test02.vue"),
    meta: {
      title: "測試02",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;