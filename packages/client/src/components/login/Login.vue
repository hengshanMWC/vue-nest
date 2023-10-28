<script lang="ts" setup>
import {
  type FormInst, useMessage,
} from 'naive-ui'
import { useAsyncState } from '@vueuse/core'
import type { ResultData } from '@lib/store'
import { AppHttpCode } from '@lib/base'
import type { UserInfoResultDto } from '@lib/dtos'
import { getLoginModel, getLoginRules } from './utils'
import { fetchLogin, fetchUserInfo } from '@/api'

const emit = defineEmits<{
  (e: 'success', userInfo: UserInfoResultDto): void
}>()

const formRef = ref<FormInst | null>(null)

const modelData = getLoginModel()
const modelRef = ref(modelData)

const disabled = computed(() => {
  return !Object
    .keys(modelData)
    .every(key => modelRef.value[key as keyof typeof modelData])
})

const message = useMessage()

const {
  isLoading, execute: executeLogin,
} = useAsyncState(async () => {
  await fetchLogin(modelRef.value)
  const userInfo = await fetchUserInfo()
  emit('success', userInfo)
  return null
}, null, {
  immediate: false,
  onError(error) {
    const resError = error as ResultData<null>
    if (resError.code === AppHttpCode.USER_PASSWORD_INVALID)
      message.info('帐号或密码错误')
    else
      message.error('登录失败')
  },
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
  >
    <n-form-item path="account" label="账号">
      <n-input v-model:value="modelRef.account" :maxlength="200" />
    </n-form-item>
    <n-form-item path="password" label="密码">
      <n-input
        v-model:value="modelRef.password"
        type="password"
        :maxlength="30"
        show-password-on="mousedown"
      />
    </n-form-item>
    <n-button
      :disabled="disabled"
      :loading="isLoading"
      round
      class="width100"
      type="primary"
      @click="handleValidate"
    >
      登录
    </n-button>
  </n-form>
</template>
