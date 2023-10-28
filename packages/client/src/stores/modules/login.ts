import { defineStore, storeToRefs } from 'pinia'
import type { UserInfoResultDto } from '@lib/dtos'
import { useUserStore } from './user'

type LoginResolve = (value: UserInfoResultDto) => void
type LoginReject = (error: Error) => void
export const useLoginStore = defineStore(
  'login',
  () => {
    const { userInfo } = storeToRefs(useUserStore())

    const isLogin = computed(() => !!userInfo.value.id)
    watch(isLogin, () => {
      if (isLogin)
        loginSuccess(userInfo.value as UserInfoResultDto)
    })

    const loginModalShow = ref<boolean>(false)

    const loginPromise = ref<Promise<UserInfoResultDto> | null>(null)
    const loginResolve = ref<LoginResolve | null>(null)
    const loginReject = ref<LoginReject | null>(null)

    function openLogin() {
      if (!loginPromise.value) {
        loginPromise.value = new Promise((resolve: LoginResolve, reject: LoginReject) => {
          loginModalShow.value = true
          loginResolve.value = resolve
          loginReject.value = reject
        }).finally(() => {
          loginModalShow.value = false
          loginResolve.value = null
          loginReject.value = null
          loginPromise.value = null
        })
      }
      return loginPromise.value
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
