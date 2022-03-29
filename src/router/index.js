import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
    path: "/Home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "首頁",
    },
  },
  {
    path: "/UsaStock",
    name: "UsaStock",
    component: () => import("../views/UsaStock.vue"),
    meta: {
      title: "測試使用",
    },
  },
  {
    path: "/SportHome",
    name: "SportHome",
    component: () => import("../views/SportHome.vue"),
    meta: {
      title: "運動賽事",
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

const allPaths = routes.map(e => e.path);
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (!allPaths.includes(to.path)) {
    next("Home");
  }
  next();
});

export default router;