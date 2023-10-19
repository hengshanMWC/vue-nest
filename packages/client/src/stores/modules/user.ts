import { defineStore } from 'pinia'
import { clearLocalStorage } from '@/utils/cache'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<null | { id: string }>(null)
    watch(userInfo, (data) => {
      if (data)
        clearLocalStorage()
    })
    return {
      userInfo,
    }
  },
)
