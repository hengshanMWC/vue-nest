<script lang="ts" setup>
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/modules/user'

const userStore = useUserStore()
const { reset } = userStore
const { userInfo, isLogin, loginModalShow } = storeToRefs(userStore)
const router = useRouter()
const { t } = useI18n()

enum OPTIONS_KEY {
  USER_INFO,
  LOGOUT,
}

const options = computed<DropdownMixedOption[]>(() => {
  return isLogin.value
    ? [
        {
          key: OPTIONS_KEY.USER_INFO,
          label: t('user-settings'),
        },
        {
          key: OPTIONS_KEY.LOGOUT,
          label: t('sign-out'),
        },
      ]
    : []
})

function handleSelect(key: OPTIONS_KEY) {
  switch (key) {
    case OPTIONS_KEY.USER_INFO:
      router.push({
        name: 'user',
      })
      break
    case OPTIONS_KEY.LOGOUT:
      reset()
      break
  }
}

function handleLogin() {
  loginModalShow.value = true
}
</script>

<template>
  <n-dropdown
    trigger="hover"
    :options="options"
    @select="handleSelect"
  >
    <n-avatar
      class="cursor-pointer"
      :size="38"
      color="transparent"
      round
      :src="userInfo.avatar"
      @click="!isLogin && handleLogin()"
    />
  </n-dropdown>
</template>

<style scoped></style>
