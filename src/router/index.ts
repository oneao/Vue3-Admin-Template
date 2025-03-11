import type { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "@/store/user";
import { useRouterStore } from "@/store/route";

import routes from "./routes";

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

router.beforeEach((to, from, next) => {
  window.NProgress?.start?.();

  const userStore = useUserStore();
  const routerStore = useRouterStore();

  if (to.path !== "/login" && to.path !== "/404" && isPathInRoutes(to.path)) {
    let title = to.meta.title as string;

    if (to.query.b_id) {
      title = title + " " + to.query.b_id;
    }

    routerStore.addRouterPath({
      key: to.fullPath,
      title: title
    });
  }

  if (!userStore.isLogined && to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
});

router.afterEach(() => {
  window.NProgress?.done?.();
});

export function setupRouter(app: App) {
  app.use(router);
}

function isPathInRoutes(path: string): boolean {
  // 处理特殊的 `/home` 和 `/`
  if (path === "/" || path === "/home") {
    return true;
  }

  // 遍历所有路由，检查是否匹配
  for (const route of routes) {
    if (route.path === path) {
      return true;
    }

    // 如果该路由有子路由，检查子路由
    if (route.children) {
      for (const child of route.children) {
        if (child.path === path) {
          return true;
        }
      }
    }
  }

  // 如果没有找到匹配的路由
  return false;
}
