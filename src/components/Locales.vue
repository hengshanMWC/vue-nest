<template>
  <n-dropdown trigger="hover" :options="options">
    <n-icon :size="48">
      <Earth></Earth>
    </n-icon>
  </n-dropdown>
</template>

<script lang="ts" setup>
import { Earth } from '@vicons/ionicons5'
import { LOCALES } from '@/constant'
const options = [
  {
    key: LOCALES.EN_US,
    label: 'English',
  },
  {
    key: LOCALES.ZH_CN,
    label: '简体中文',
  },
  {
    key: LOCALES.ZH_TW,
    label: '繁体中文',
  },
  {
    key: LOCALES.JA_JP,
    label: '日本語',
  },
]
</script>

<style scoped>
.container {}
</style>
