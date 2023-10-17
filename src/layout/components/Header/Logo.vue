<script lang="ts" setup>
import { useRouter } from 'vue-router'
import LogoSvg from '@/assets/images/logo.svg'

const router = useRouter()
function handleHome() {
  router.push({
    name: 'home',
  })
}
</script>

<template>
  <n-icon class="cursor-pointer" size="30" title="Vue-Next" @click="handleHome">
    <LogoSvg />
  </n-icon>
</template>

<style scoped></style>
