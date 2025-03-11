<template>
  <div class="tools">
    <a-button type="text" class="tools-button" @click="toggleFullScreen">
      <SvgIcon icon="mingcute:fullscreen-line" class="tools-button__icon" />
    </a-button>
    <a-dropdown trigger="click" position="bl">
      <a-button type="text" class="tools-button" :style="{ paddingLeft: '12px', paddingRight: '12px' }">
        <SvgIcon icon="mingcute:user-4-line" class="tools-button__icon"></SvgIcon>
        <span class="tools-button__text">{{ "ADMIN" || "尚未登录" }}</span>
      </a-button>
      <template #content>
        <a-doption @click="handleLogout">
          <template #icon>
            <SvgIcon icon="tabler:arrow-bar-to-right" />
          </template>
          退出
        </a-doption>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";

const router = useRouter();
const userStore = useUserStore();

function handleLogout() {
  userStore.userInfo.token = "";
  router.push("/login");
}
const toggleFullScreen = () => {
  const element = document.documentElement; // 全屏元素可以是 `document.documentElement`，也可以是图片元素等
  if (
    !document.fullscreenElement && // 判断是否已进入全屏模式
    // @ts-expect-error: ingore
    !document.webkitFullscreenElement && // 兼容 Webkit 内核浏览器（如 Safari）
    // @ts-expect-error: ingore
    !document.mozFullScreenElement && // Firefox 浏览器的前缀
    // @ts-expect-error: ingore
    !document.msFullscreenElement
  ) {
    // IE 浏览器的前缀
    // 进入全屏
    if (element.requestFullscreen) {
      element.requestFullscreen(); // 标准方法
      // @ts-expect-error: ingore
    } else if (element.webkitRequestFullscreen) {
      // @ts-expect-error: ingore
      element.webkitRequestFullscreen(); // Safari 方法
      // @ts-expect-error: ingore
    } else if (element.mozRequestFullScreen) {
      // @ts-expect-error: ingore
      element.mozRequestFullScreen(); // Firefox 方法
      // @ts-expect-error: ingore
    } else if (element.msRequestFullscreen) {
      // @ts-expect-error: ingore
      element.msRequestFullscreen(); // IE 方法
    }
  } else {
    // 退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen(); // 标准方法
      // @ts-expect-error: ingore
    } else if (document.webkitExitFullscreen) {
      // @ts-expect-error: ingore
      document.webkitExitFullscreen(); // Safari 方法
      // @ts-expect-error: ingore
    } else if (document.mozCancelFullScreen) {
      // @ts-expect-error: ingore

      document.mozCancelFullScreen(); // Firefox 方法
      // @ts-expect-error: ingore
    } else if (document.msExitFullscreen) {
      // @ts-expect-error: ingore

      document.msExitFullscreen(); // IE 方法
    }
  }
};
</script>

<style scoped lang="scss">
@use "./index" as *;
</style>
