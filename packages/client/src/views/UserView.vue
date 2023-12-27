<script lang="ts" setup>
import { type FormInst, useMessage } from 'naive-ui'
import { useAsyncState } from '@vueuse/core'
import type { ResultData } from '@lib/store'
import { AppHttpCode } from '@lib/base'
import { omit } from 'lodash-es'
import { effect } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import type { UpdateUserDto } from '@lib/dtos'
import { getRegisterModel, getRegisterRules } from '@/model/business'
import { fetchUpdateUserInfo } from '@/api'
import { useLoginStore } from '@/stores/modules/login'
import { HOME_PAGE_NAME } from '@/constant/common'
import { useUserStore } from '@/stores/modules/user'
import type { UserInfo } from '@/stores/modules/user'

const emit = defineEmits<{
  (e: 'update:loading', loading: boolean): void
  (e: 'success'): void
}>()

const routers = useRouter()

const loginStore = useLoginStore()
const { openLogin } = loginStore
const { isLogin } = storeToRefs(loginStore)
if (!isLogin.value) {
  openLogin().catch(() => routers.push({ name: HOME_PAGE_NAME }))
}

const { userInfo } = storeToRefs(useUserStore())
const modelData = getRegisterModel()
const modelDataRef = ref<UserInfo>({
  ...modelData,
  ...userInfo.value,
} as UserInfo)

const formRef = ref<FormInst | null>(null)

const disabled = computed(() => {
  console.log('modelDataRef', modelDataRef.value)
  if (modelDataRef.value) {
    return !Object.keys(omit(modelData, 'email')).every(
      key => (modelDataRef as any).value[key as keyof typeof modelData],
    )
  } else {
    return true
  }
})

const message = useMessage()

const { isLoading, execute: executeLogin } = useAsyncState(
  async () => {
    const reqData = modelDataRef.value as UpdateUserDto
    await fetchUpdateUserInfo(reqData)
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

// effect(() => {
//   modelDataRef.value = {
//     ...modelDataRef.value,
//     ...userInfo.value,
//   }
// })

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
  <n-layout>
    <n-form
      v-if="modelDataRef"
      ref="formRef"
      :model="modelDataRef"
      :rules="getRegisterRules(modelDataRef)"
      :disabled="isLoading"
      @keyup.enter="handleValidate"
    >
      <n-form-item path="avatar">
        <n-avatar
          class="cursor-pointer"
          :size="38"
          color="transparent"
          round
          :src="modelDataRef.avatar"
        />
      </n-form-item>
      <n-form-item path="account" label="账号">
        <n-input v-model:value="modelDataRef.account" :maxlength="200" />
      </n-form-item>
      <n-form-item path="phoneNum" label="手机号">
        <n-input
          v-model:value="modelDataRef.phoneNum"
          :maxlength="11"
          pattern="[0-9]"
        />
      </n-form-item>
      <n-form-item path="email" label="邮箱" type="email">
        <n-input v-model:value="modelDataRef.email" :maxlength="200" />
      </n-form-item>
      <n-button
        :disabled="disabled"
        :loading="isLoading"
        round
        class="width100"
        type="primary"
        @click="handleValidate"
      >
        保存
      </n-button>
    </n-form>
  </n-layout>
</template>
