<script lang="ts" setup>
import LoginModal from '@/components/login/Modal.vue'
import { fetchUserInfo } from '@/api'

fetchUserInfo()
  .catch(error => error)
</script>

<template>
  <RouterView />
  <LoginModal />
</template>

<style scoped>
</style>
