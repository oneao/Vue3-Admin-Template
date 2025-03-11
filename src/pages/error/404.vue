<template>
  <div>
    <a-result status="404" subtitle="该页面已被移动或删除">
      <template #extra>
        <a-space>
          <a-button type="primary" @click="handleToHome()">返回首页</a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const handleToHome = () => {
  router.push("/home");
};
</script>

<style scoped lang="scss"></style>
