<template>
  <div class="app-views">
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="[...visitedViewPaths]">
        <component :is="formatComponentInstance(Component, route)" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { h, defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";

// 用来存已经创建的组件实例
const wrapperMap = new Map<string, any>();

// 监听路由变化，更新 visitedViewPaths
const visitedViewPaths = ref<string[]>([]);
const route = useRoute();

watch(
  () => route.fullPath,
  (newPath) => {
    if (!visitedViewPaths.value.includes(newPath)) {
      visitedViewPaths.value.push(newPath);
    }
  },
  { immediate: true }
);

// 将 router 传给我们的组件重新包装一个新的组件，原组件包含在里面
function formatComponentInstance(component: any, route: any) {
  if (!component) return null;

  const wrapperName = route.fullPath;

  let wrapper = wrapperMap.get(wrapperName);
  if (!wrapper) {
    wrapper = defineComponent({
      name: wrapperName,
      render() {
        return h(component);
      }
    });
    wrapperMap.set(wrapperName, wrapper);
  }

  return wrapper;
}
</script>

<style scoped lang="scss">
@use "./index" as *;
</style>
