<script lang="ts" setup>
import LoginModal from '@/components/login/Modal.vue'
import { fetchUserInfo } from '@/api'

fetchUserInfo()
</script>

<template>
  <RouterView />
  <LoginModal />
</template>

<style scoped>
</style>
