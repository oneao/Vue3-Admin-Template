import { ref, computed } from "vue"
import { defineStore } from "pinia"


const initState = {
  id: "",
  account: "",
  email: "",
  name: "",
  token: "",
  avatar: "",
}

export const useUserStore = defineStore(
  "user",
  () => {
    const userInfo = ref<IUserInfo>({ ...initState })

    const setUserInfo = (val: IUserInfo) => {
      userInfo.value = { ...userInfo.value, ...val }
    }

    const clearUserInfo = () => {
      reset()
    }
    // 一般没有reset需求，不需要的可以删除
    const reset = () => {
      userInfo.value = {
        id: "",
        account: "",
        email: "",
        name: "",
        token: "",
        avatar: "",
      }
    }
    // ✅ 如果需要同时验证多个字段
    const isLogined = computed(() => {
      return !!(
        userInfo.value.id
        // userInfo.value.name // 名称
      )
    })

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      isLogined,
      reset,
    }
  },
  {
    persist: true,
  },
)
