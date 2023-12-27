<script lang="ts" setup>
import { type FormInst, useMessage } from 'naive-ui'
import { useAsyncState } from '@vueuse/core'
import type { ResultData } from '@lib/store'
import { AppHttpCode } from '@lib/base'
import { omit } from 'lodash-es'
import { effect } from 'vue'
import type { UserInfo } from '@/stores/modules/user'
import { getRegisterModel, getRegisterRules } from '@/model/business'
import { fetchRegister } from '@/api'

const emit = defineEmits<{
  (e: 'update:loading', loading: boolean): void
  (e: 'success'): void
}>()

const modelData = getRegisterModel()

const formRef = ref<FormInst | null>(null)
const modelRef = ref(modelData)

const disabled = computed(() => {
  return !Object.keys(omit(modelData, 'avatar', 'email')).every(
    key => modelRef.value[key as keyof typeof modelData],
  )
})

const message = useMessage()

const { isLoading, execute: executeLogin } = useAsyncState(
  async () => {
    const reqData = modelRef.value
    await fetchRegister(reqData)
    handleSuccess()
    return null
  },
  null,
  {
    immediate: false,
    onError(error) {
      const resError = error as ResultData<null>
      if (resError.code === AppHttpCode.USER_PASSWORD_INVALID)
        message.info('两次密码输入不一致')
      else if (resError.code === AppHttpCode.USER_CREATE_EXISTING_ACCOUNT)
        message.info('帐号已存在，请调整后重新注册')
      else if (resError.code === AppHttpCode.USER_CREATE_EXISTING_PHONE)
        message.info('当前手机号已存在，请调整后重新注册')
      else if (resError.code === AppHttpCode.USER_CREATE_EXISTING_EMAIL)
        message.info('当前邮箱已存在，请调整后重新注册')
      else message.info('注册失败')
    },
  },
)

effect(() => {
  emit('update:loading', isLoading.value)
})

function handleSuccess() {
  message.success('注册成功')
  emit('success')
}

function handleValidate(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate(errors => {
    if (!errors) {
      executeLogin()
    } else {
      console.log(errors)
      message.error('注册失败')
    }
  })
}
</script>

<template>
  <n-form
    ref="formRef"
    :model="modelRef"
    :rules="getRegisterRules(modelRef as UserInfo)"
    :disabled="isLoading"
    @keyup.enter="handleValidate"
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
    <n-form-item path="confirmPassword" label="确认密码">
      <n-input
        v-model:value="modelRef.confirmPassword"
        type="password"
        :maxlength="30"
        show-password-on="mousedown"
      />
    </n-form-item>
    <n-form-item path="phoneNum" label="手机号">
      <n-input
        v-model:value="modelRef.phoneNum"
        :maxlength="11"
        pattern="[0-9]"
      />
    </n-form-item>
    <n-form-item path="email" label="邮箱" type="email">
      <n-input v-model:value="modelRef.email" :maxlength="200" />
    </n-form-item>
    <n-button
      :disabled="disabled"
      :loading="isLoading"
      round
      class="width100"
      type="primary"
      @click="handleValidate"
    >
      注册
    </n-button>
  </n-form>
</template>
