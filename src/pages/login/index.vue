<template>
  <div class="app">
    <div class="login">
      <div class="login-left">
        <img src="/logo.png" alt="Logo" />
      </div>
      <div class="login-right">
        <div class="login-right-title">{{ appTitle }}</div>
        <a-form :model="form" layout="vertical" size="large" @submit="handleSubmit">
          <a-form-item field="orgid" label="机构码" :rules="[{ required: true, message: '机构码不能为空' }]">
            <a-input v-model="form.orgid" />
          </a-form-item>
          <a-form-item field="userid" label="账号" :rules="[{ required: true, message: '账号不能为空' }]">
            <a-input v-model="form.userid" />
          </a-form-item>
          <a-form-item field="password" label="密码">
            <a-input v-model="form.password" />
          </a-form-item>
          <a-form-item class="login-button">
            <a-button long type="primary" html-type="submit" :loading="loading">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import { Message } from "@arco-design/web-vue"
import { useUserStore } from "@/store/user"
import { useRouter } from "vue-router"

const appTitle = import.meta.env.VITE_APP_TITLE

const userStore = useUserStore()
const router = useRouter()

const form = reactive({
  orgid: "",
  userid: "",
  password: "",
})

const loading = ref(false)

const handleSubmit = (data: any) => {
  if (data.errors) {
    return
  }
  loading.value = true
  Message.success("登录成功")
  router.push("/home")
  // loginApi({
  //   userid: form.userid,
  //   password: form.password,
  // })
  //   .then((res) => {
  //     userStore.setUserInfo({
  //       orgid: form.orgid,
  //       userid: form.userid,
  //       token: res.data,
  //     })
  //     Message.success("登录成功")
  //     router.push("/home")
  //   })
  //   .finally(() => {
  //     loading.value = false
  //   })
}
</script>

<style scoped lang="scss">
.app {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  // background-color: #f0f0f0;
}

.login {
  display: flex;
  width: 1000px;
  height: 500px;
  overflow: hidden;
  // background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 6px 24px -8px rgba(0, 0, 0, 0.1);
}

.login-left {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 32px;
  border-right: 1px solid #e9e9e9;
}

.login-left img {
  width: 100%;
  height: 100%;
}

.login-right {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 50%;
  padding: 32px;
  // background-color: #ffffff;
}
.login-right-title {
  font-size: 20px;
  font-weight: bold;
}
</style>
