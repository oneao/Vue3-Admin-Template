import { ref } from "vue"
import { defineStore } from "pinia"

export const useAppStore = defineStore("app", () => {
  const isFold = ref<boolean>(false)

  const updateIsFold = () => {
    isFold.value = !isFold.value
  }
  return {
    isFold,
    updateIsFold,
  }
})
