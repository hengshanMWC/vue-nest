<template>
  <n-dropdown trigger="hover" :options="options" :value="locale" @select="handleSelect">
    <n-icon :size="38" class="cursor-pointer">
      <Earth></Earth>
    </n-icon>
  </n-dropdown>
</template>

<script lang="ts" setup>
import { Earth } from '@vicons/ionicons5'
import { LOCALES } from '@/constant'
import { useSettingStore } from '@/stores/modules/setting';
import { storeToRefs } from 'pinia';

const { locale } = storeToRefs(useSettingStore())
function handleSelect(value: LOCALES) {
  locale.value = value
}
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
