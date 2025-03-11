import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import { useRoute } from "vue-router"
type route = {
  key: string
  title: string
}

export const useRouterStore = defineStore(
  "router",
  () => {
    const route = useRoute()
    const router = useRouter()
    const routerData = ref<route[]>([
      {
        key: "/home",
        title: "首页",
      },
    ])

    const addRouterPath = (data: route) => {
      if (!routerData.value.some((item) => item.key === data.key)) {
        routerData.value.push(data)
      }
    }

    const removeRouterPath = (key: string) => {
      routerData.value = routerData.value.filter((item) => item.key !== key)
    }

    const getRouterPaths = computed(() => routerData.value)

    const toRouterPath = (path: string) => {
      router.push(path)
    }
    const getCurrentPath = () => {
      return route.fullPath
    }
    return {
      routerData,
      addRouterPath,
      removeRouterPath,
      getRouterPaths,
      toRouterPath,
      getCurrentPath,
    }
  },
  {
    // persist: true // 持久化存储
  },
)
