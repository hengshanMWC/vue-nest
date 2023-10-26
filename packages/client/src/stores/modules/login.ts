import { defineStore, storeToRefs } from 'pinia'
import type { UserInfoResultDto } from '@lib/dtos'
import { useUserStore } from './user'

export const useLoginStore = defineStore(
  'login',
  () => {
    const { userInfo } = storeToRefs(useUserStore())
    const isLogin = computed(() => !!userInfo.value.id)

    const loginModalShow = ref<boolean>(false)
    const loginResolve = ref<((value: UserInfoResultDto) => void) | null>(null)
    const loginReject = ref<((error: Error) => void) | null>(null)

    function openLogin() {
      return new Promise((resolve, reject) => {
        loginModalShow.value = true
        loginResolve.value = resolve
        loginReject.value = reject
      }).finally(() => {
        loginModalShow.value = false
        loginResolve.value = null
        loginReject.value = null
      })
    }

    function loginSuccess(userInfo: UserInfoResultDto) {
      loginResolve.value?.(userInfo)
    }

    function loginFail(error: Error) {
      loginReject.value?.(error)
    }

    return {
      isLogin,
      loginModalShow,
      openLogin,
      loginSuccess,
      loginFail,
    }
  },
)
