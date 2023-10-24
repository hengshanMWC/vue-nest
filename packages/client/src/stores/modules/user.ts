import { defineStore } from 'pinia'
import type { CreateUserResultDto } from '@lib/dtos'
import { clearLocalStorage } from '@/utils/cache'
import { useResetReactive } from '@/hook'

type UserInfo = Pick<CreateUserResultDto, 'avatar'> & Partial<CreateUserResultDto>

export const useUserStore = defineStore(
  'user',
  () => {
    const [userInfo, reset] = useResetReactive<UserInfo>({
      avatar: 'https://vue-nest.com/public/images/not_user_avatar.png',
    })

    const isLogin = computed(() => !!userInfo.id)

    function logout() {
      userInfo.id = undefined
    }

    watch(userInfo, (data) => {
      if (data?.id) {
        clearLocalStorage()
        reset()
      }
    })

    const loginModalShow = ref<boolean>(false)

    return {
      userInfo,
      isLogin,
      logout,
      loginModalShow,
    }
  },
)
