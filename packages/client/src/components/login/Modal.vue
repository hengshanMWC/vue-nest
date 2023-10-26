<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useToggle } from '@vueuse/core'
import RegisterVue from './Register.vue'
import { useUserStore } from '@/stores/modules/user'

const { loginModalShow } = storeToRefs(useUserStore())

const [loginShow, toggle] = useToggle(true)
const info = computed(() => {
  if (loginShow.value) {
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
  loginShow.value = true
})

function handleToggle() {
  toggle()
}

function handleLoginSuccess() {
  loginModalShow.value = false
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
      <Login v-if="loginShow" @success="handleLoginSuccess" />
      <RegisterVue v-else @success="handleToggle" />
    </KeepAlive>
    <n-button class="width100 mt-5" round @click="handleToggle">
      {{ info.switchText }}
    </n-button>
  </n-modal>
</template>
