import { defineStore } from 'pinia'
import type { UserInfoResultDto } from '@lib/dtos'
import { clearLocalStorage } from '@/utils/cache'
import { useResetData } from '@/hook'

export type UserInfo = Pick<UserInfoResultDto, 'avatar'> & Partial<UserInfoResultDto>

export const useUserStore = defineStore(
  'user',
  () => {
    const [userInfo, reset] = useResetData<UserInfo>({
      id: undefined,
      avatar: 'https://vue-nest.com/public/images/not_user_avatar.png',
    })

    watch(userInfo, (data) => {
      if (!data?.id)
        clearLocalStorage()
    })

    return {
      userInfo,
      reset,
    }
  },
)
