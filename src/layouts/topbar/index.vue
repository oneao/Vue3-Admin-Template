<template>
  <div class="app-topbar shadow-header">
    <div class="app-topbar__action">
      <div class="i-line-md:menu-fold-left app-topbar__action__icon"
      :class="appStore.isFold ? 'i-line-md:menu-fold-right' : 'i-line-md:menu-fold-left'" 
      @click="appStore.updateIsFold()"></div>
    </div>
    <RouteNav></RouteNav>
    <div class="flex1"></div>
    <Tools />
  </div>
</template>

<script setup lang="ts">
import RouteNav from "./route-nav/index.vue";
import Tools from "./tools/index.vue";
import { useAppStore } from "@/store/app";

const appStore = useAppStore();
</script>

<style scoped lang="scss">
@use "./index" as *;
</style>
