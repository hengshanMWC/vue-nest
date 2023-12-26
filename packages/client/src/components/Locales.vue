<script lang="ts" setup>
import { Earth } from '@vicons/ionicons5'
import { storeToRefs } from 'pinia'
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
import { LOCALES_ENUM } from '@/constant'
import { useSettingStore } from '@/stores/modules/setting'

const { locale } = storeToRefs(useSettingStore())
function handleSelect(value: LOCALES_ENUM) {
  locale.value = value
}
const options: DropdownMixedOption[] = [
  {
    key: LOCALES_ENUM.EN_US,
    label: 'English',
  },
  {
    key: LOCALES_ENUM.ZH_CN,
    label: '简体中文',
  },
  {
    key: LOCALES_ENUM.ZH_TW,
    label: '繁体中文',
  },
  {
    key: LOCALES_ENUM.JA_JP,
    label: '日本語',
  },
]
</script>

<template>
  <n-dropdown
    trigger="hover"
    :options="options"
    :value="locale"
    @select="handleSelect"
  >
    <n-icon :size="38" class="cursor-pointer">
      <Earth />
    </n-icon>
  </n-dropdown>
</template>
