<script lang="ts" setup>
import {
  type FormInst, useMessage,
} from 'naive-ui'
import { useAsyncState } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import type { ResultData } from '@lib/store'
import { AppHttpCode } from '@lib/base'
import { getLoginModel, getLoginRules } from './utils'
import { fetchLogin, fetchUserInfo } from '@/api'
import { setToken } from '@/utils/cache'
import { useUserStore } from '@/stores/modules/user'

const modelData = getLoginModel()

const { userInfo, loginModalShow } = storeToRefs(useUserStore())
const formRef = ref<FormInst | null>(null)
const modelRef = ref(modelData)

const disabled = computed(() => {
  return !Object
    .keys(modelData)
    .every(key => modelRef.value[key as keyof typeof modelData])
})

const message = useMessage()

const {
  isLoading, isReady, execute: executeLogin,
} = useAsyncState(async () => {
  const {
    accessToken,
    refreshToken,
  } = await fetchLogin(modelRef.value)
  setToken(accessToken, refreshToken)
  return null
}, null, {
  immediate: false,
  onError(error) {
    const resError = error as ResultData<null>
    if (resError.code === AppHttpCode.USER_PASSWORD_INVALID)
      message.info('帐号或密码错误')
    else
      message.info('登录失败')
  },
})

watch(isReady, async (value) => {
  if (value) {
    const data = await fetchUserInfo()
    userInfo.value = data
    loginModalShow.value = false
  }
})

function handleValidate(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      executeLogin()
    }
    else {
      console.log(errors)
      message.error('登录失败')
    }
  })
}
</script>

<template>
  <n-form
    ref="formRef"
    :model="modelRef"
    :rules="getLoginRules()"
    class="bg-white"
  >
    <n-form-item path="account" label="账号">
      <n-input v-model:value="modelRef.account" @keydown.enter.prevent />
    </n-form-item>
    <n-form-item path="password" label="密码">
      <n-input
        v-model:value="modelRef.password"
        type="password"
        @keydown.enter.prevent
      />
    </n-form-item>
    <n-row :gutter="[0, 24]">
      <n-col :span="24">
        <n-button
          :disabled="disabled"
          :loading="isLoading"
          round
          class="width100"
          type="primary"
          @click="handleValidate"
        >
          验证
        </n-button>
      </n-col>
    </n-row>
  </n-form>
</template>
