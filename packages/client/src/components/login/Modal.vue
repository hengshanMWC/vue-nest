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
      switchText: '注册',
    }
  }
  else {
    return {
      title: '注册',
      switchText: '登录',
    }
  }
})

function handleToggle() {
  toggle()
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
    <KeepAlive>
      <Login v-if="loginShow" />
      <RegisterVue v-else />
    </KeepAlive>
    <n-button class="width100 mt-5" round @click="handleToggle">
      {{ info.switchText }}
    </n-button>
  </n-modal>
</template>
