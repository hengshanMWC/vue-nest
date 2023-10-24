<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { NAIVE_UI_LOCALES, THEME_LIST } from './constant/const'
import type { NLocaleApi } from './types'
import { useSettingStore } from './stores/modules/setting'
import ContainerVue from './Container.vue'

const { locale, themeRef } = storeToRefs(useSettingStore())
const naiveLocales = reactive<NLocaleApi>(NAIVE_UI_LOCALES[locale.value])
</script>

<template>
  <n-config-provider
    :locale="naiveLocales.locale"
    :date-locale="naiveLocales.dateLocale"
    :theme="THEME_LIST[themeRef]"
  >
    <n-message-provider>
      <ContainerVue />
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
