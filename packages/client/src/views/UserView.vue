<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/modules/login'
import { HOME_PAGE_NAME } from '@/constant/common'

const routers = useRouter()

const loginStore = useLoginStore()
const { openLogin } = loginStore
const { isLogin } = storeToRefs(loginStore)
if (!isLogin.value) {
  openLogin()
    .catch(() => routers.push({ name: HOME_PAGE_NAME }))
}
</script>

<template>
  <div class="user">
    <h1>{{ $t('demo.this-is-an-about-page') }}</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .user {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
