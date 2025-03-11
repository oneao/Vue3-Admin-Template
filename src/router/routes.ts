import { RouteRecordRaw } from "vue-router"
import Login from "@/pages/login/index.vue"
import Error404 from "@/pages/error/404.vue"

import BaseLayout from "@/layouts/base-layout/index.vue"
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: BaseLayout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("../pages/home/index.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/aboutUs/index",
        component: () => import("../pages/aboutUs/index.vue"),
        meta: {
          title: "关于我们",
        },
      },
    ],
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/:pathMatch(.*)*", // 使用 pathMatch 来捕获所有路径
    component: Error404,
  },
]

export default routes
