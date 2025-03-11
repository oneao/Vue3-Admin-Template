<template>
  <div :class="['app-layout']">
    <div :class="['app-layout', { collapse: appStore.isFold }]">
      <div class="app-layout__mask" @click="appStore.updateIsFold()"></div>
      <div class="app-layout__left">
        <Silder />
      </div>
      <div class="app-layout__right">
        <Topbar />
        <Process />
        <Content />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Silder from "../silder/index.vue"
import Topbar from "../topbar/index.vue"
import Process from "../process/index.vue"
import Content from "../content/index.vue"
import { useAppStore } from "@/store/app"
const appStore = useAppStore()
</script>

<style scoped lang="scss">
@use "./index" as *;
</style>
