<template>
  <div class="route-nav">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="item in routeTitleList" :key="item.key">{{ item.title }}</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { useRoute } from "vue-router";
import { MenuData } from "@/router/menu";
const route = useRoute();

const routeTitleList = ref<any[]>([]);

watch(
  () => route.path,
  (newVal) => {
    const selectedData = MenuData.find((item) => {
      return item.key === newVal;
    });
    routeTitleList.value = [selectedData];
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
@use "./index" as *;
</style>
