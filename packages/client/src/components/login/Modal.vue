<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useToggle } from '@vueuse/core'
import type { UserInfoResultDto } from '@lib/dtos'
import { useMessage } from 'naive-ui'
import RegisterVue from './Register.vue'
import { useLoginStore } from '@/stores/modules/login'

const disabledRef = ref<boolean>(false)

const message = useMessage()

const loginStore = useLoginStore()
const { loginSuccess, loginFail } = loginStore
const { loginModalShow, isLogin } = storeToRefs(loginStore)

const [loginPageShow, toggle] = useToggle(true)

const info = computed(() => {
  if (loginPageShow.value) {
    return {
      title: '登录',
      switchText: '去注册',
    }
  }
  else {
    return {
      title: '注册',
      switchText: '去登录',
    }
  }
})

watch(loginModalShow, () => {
  if (loginModalShow.value)
    return
  // 设置会登录
  loginPageShow.value = true
  // 报未登录
  if (!isLogin.value)
    loginFail(new Error('not login'))
})

function handleToggle() {
  toggle()
}

function handleLoginSuccess(userInfo: UserInfoResultDto) {
  message.success('登录成功')
  loginSuccess(userInfo)
}
</script>

<template>
  <n-modal
    v-model:show="loginModalShow"
    :close-on-esc="false"
    :mask-closable="false"
    :show-icon="false"
    preset="dialog"
    :title="info.title"
  >
    <KeepAlive v-if="loginModalShow">
      <Login v-if="loginPageShow" v-model:loading="disabledRef" @success="handleLoginSuccess" />
      <RegisterVue v-else v-model:loading="disabledRef" @success="handleToggle" />
    </KeepAlive>
    <n-button
      class="width100 mt-5"
      round
      :disabled="disabledRef"
      @click="handleToggle"
    >
      {{ info.switchText }}
    </n-button>
  </n-modal>
</template>
