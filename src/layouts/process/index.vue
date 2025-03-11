<template>
  <div class="app-process">
    <div class="app-process__operation">
      <div class="item" @click="handleBack()">
        <SvgIcon :icon="'tabler:arrow-back'" :style="{ height: '1rem', width: '1rem' }" />
      </div>
      <div class="item" @click="handleRefresh()">
        <SvgIcon :icon="'tabler:refresh'" :style="{ height: '1rem', width: '1rem' }" />
      </div>
      <div class="item" @click="handleToHome()">
        <SvgIcon :icon="'tabler:home-2'" :style="{ height: '1rem', width: '1rem' }" />
      </div>
    </div>
    <div class="app-process__container">
      <div class="app-process__scroller" :ref="setRefs('scroller')">
        <a-dropdown trigger="contextMenu" position="bottom" v-for="(item, index) in routerStore.routerData" :key="item.key" class="dropdown">
          <template #content>
            <a-doption :disabled="item.key === '/home'" @click="handleClose(item)">
              <template #icon>
                <SvgIcon icon="tabler:x" />
              </template>
              <template #default>关闭</template>
            </a-doption>
            <a-doption @click="handleCloseOther(item)">
              <template #icon>
                <SvgIcon icon="tabler:minus" />
              </template>
              <template #default>关闭其他</template>
            </a-doption>
            <a-doption @click="handleCloseLeft(item)">
              <template #icon>
                <SvgIcon icon="tabler:arrow-left" />
              </template>
              <template #default>关闭左侧</template>
            </a-doption>
            <a-doption @click="handleCloseRight(item)">
              <template #icon>
                <SvgIcon icon="tabler:arrow-right" />
              </template>
              <template #default>关闭右侧</template>
            </a-doption>
            <a-doption @click="handleCloseAll">
              <template #icon>
                <SvgIcon icon="tabler:circle-x" />
              </template>
              <template #default>关闭所有</template>
            </a-doption>
          </template>
          <div :key="item.key" class="app-process__item" :ref="setRefs(`item-${index}`)" :class="{ active: item.key === currentPath }" @click="handleToPath(item)">
            <span>{{ item.title }}</span>
            <div class="icon i-material-symbols:close-rounded" @click.stop="handleClose(item)"></div>
          </div>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { useRouterStore } from "@/store/route"
import { useRoute, useRouter } from "vue-router"
import { useRefs } from "@/utils"
const route = useRoute()
const router = useRouter()
const routerStore = useRouterStore()

const { refs, setRefs } = useRefs()

const currentPath = ref("")

// 监听路由变化并更新当前路径
watch(
  () => route.fullPath,
  (newVal) => {
    currentPath.value = newVal
    const index = routerStore.routerData.findIndex((item) => item.key === route.fullPath)
    moveScroll(index)
  },
  { immediate: true },
)

const handleBack = () => {
  router.back()
}
const handleRefresh = () => {
  window.location.reload()
}
const handleToHome = () => {
  router.push("/")
}
// 跳转到指定路径
const handleToPath = (data: any) => {
  router.push(data.key)
}

// 调整滚动位置
function moveScroll(index: number) {
  if (index !== -1) {
    let attempts = 0
    const maxAttempts = 5

    const scrollToActiveTab = () => {
      const el = refs[`item-${index}`]
      const wrap = refs.scroller
      if (!el || !wrap) return

      const scrollLeft = el.offsetLeft - wrap.clientWidth / 2 + el.clientWidth / 2
      wrap.scrollLeft = scrollLeft

      // 检查是否正确滚动，如果位置不对，则重试
      if (wrap.scrollLeft !== scrollLeft && attempts < maxAttempts) {
        attempts++
        requestAnimationFrame(scrollToActiveTab)
      }
    }

    requestAnimationFrame(scrollToActiveTab)
  }
}
// 处理移除路由
const handleClose = (data: any) => {
  if (data.key === "/home") {
    return
  }
  if (route.fullPath !== data.key) {
    routerStore.removeRouterPath(data.key)
  } else {
    const currentIndex = routerStore.routerData.findIndex((item) => item.key === currentPath.value)

    if (currentIndex !== -1) {
      const leftPath = routerStore.routerData[currentIndex - 1]
      const rightPath = routerStore.routerData[currentIndex + 1]

      if (leftPath) {
        // 左侧有路径，跳转到左侧路径
        router.push(leftPath.key)
      } else if (rightPath) {
        // 左侧没有路径，但右侧有路径，跳转到右侧路径
        router.push(rightPath.key)
      } else {
        // 左右都没有路径，跳转到首页
        router.push("/home")
      }

      // 删除当前路由路径
      routerStore.removeRouterPath(data.key)
    }
  }
}

const handleCloseOther = (data: any) => {
  let routerData = routerStore.routerData
  routerData.forEach((item) => {
    if (item.key !== "/home" && item.key !== route.fullPath) {
      routerStore.removeRouterPath(item.key)
    }
  })
  if (data.key !== route.fullPath) {
    router.push(data.key)
  }
}

const handleCloseLeft = (data: any) => {
  let routerData = routerStore.routerData

  // 获取当前标签的索引
  const currentIndex = routerData.findIndex((item) => item.key === data.key)

  if (currentIndex === -1) return // 如果找不到当前标签，直接返回

  // 关闭左侧的所有标签（排除 /home）
  routerData.slice(0, currentIndex).forEach((item) => {
    if (item.key !== "/home") {
      routerStore.removeRouterPath(item.key)
      if (item.key === route.fullPath) {
        router.push(data.key)
      }
    }
  })
}

const handleCloseRight = (data: any) => {
  let routerData = routerStore.routerData

  // 获取当前标签的索引
  const currentIndex = routerData.findIndex((item) => item.key === data.key)

  if (currentIndex === -1) return

  // 关闭右侧的所有标签（排除 /home）
  routerData.slice(currentIndex + 1).forEach((item) => {
    if (item.key !== "/home") {
      routerStore.removeRouterPath(item.key)
      if (item.key === route.fullPath) {
        router.push(data.key)
      }
    }
  })
}

const handleCloseAll = () => {
  let routerData = routerStore.routerData
  routerData.forEach((item) => {
    if (item.key !== "/home") {
      routerStore.removeRouterPath(item.key)
    }
  })
  if ("/home" !== route.fullPath) {
    router.push("/home")
  }
}
</script>

<style scoped lang="scss">
@use "./index" as *;
</style>
