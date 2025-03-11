<template>
  <div class="app-slider">
    <div class="app-slider__logo">
      <img src="/favicon.svg" />
      <span v-if="!appStore.isFold">Admin Template</span>
    </div>
    <a-menu :selected-keys="selectedKeys" :open-keys="selectedKeys" @menu-item-click="handleClickMenu" :collapsed="appStore.isFold">
      <!-- 过滤掉 showMenu 为 false 的项 -->
      <a-menu-item v-for="item in filteredMenuData" :key="item.key">
        <template #icon><SvgIcon :icon="item.icon" class="arco-icon arco-icon-apps"></SvgIcon></template>
        {{ item.title }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/store/app";
import { MenuData } from "@/router/menu";

const appStore = useAppStore();
const route = useRoute();
const router = useRouter();
const selectedKeys = ref<string[]>([]);

// 获取当前路径
const currentPath = ref("");

// 监听 route.path 的变化
watch(
  () => route.path,
  (newVal) => {
    currentPath.value = newVal;
    const menuItem = MenuData.find((item) => item.key === newVal);
    if (menuItem?.father) {
      selectedKeys.value = [menuItem?.father];
    } else if (newVal) {
      selectedKeys.value = [newVal];
    } else {
      // 不做处理
    }
  },
  { immediate: true }
);

// 过滤 MenuData，只返回 showMenu 为 true 的项
const filteredMenuData = computed(() => {
  return MenuData.filter((item) => item.showMenu !== false);
});

const handleClickMenu = (key: string) => {
  // 查找与 key 匹配的菜单项
  const menuItem = MenuData.find((item) => item.key === key);

  if (menuItem) {
    currentPath.value = key;
    router.push(menuItem.key);
  } else {
    console.warn(`No menu item found for key: ${key}`);
  }
};
</script>

<style scoped lang="scss">
@use "./index" as *;
</style>
