<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/modules/user'

const { loginModalShow } = storeToRefs(useUserStore())
</script>

<template>
  <n-modal
    v-model:show="loginModalShow"
    :close-on-esc="false"
    :mask-closable="false"
    :show-icon="false"
    preset="dialog"
    title="登录"
  >
    <Login />
  </n-modal>
</template>
