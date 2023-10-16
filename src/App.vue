
<template>
  <n-config-provider :locale="naiveLocales.locale" :date-locale="naiveLocales.dateLocale">
    <RouterView />
  </n-config-provider>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { RouterView } from 'vue-router'
import { NAIVE_UI_LOCALES } from './constant/const';
import type { NLocaleApi } from './types';
import { storeToRefs } from 'pinia';
import { useSettingStore } from './stores/modules/setting';
const { locale } = storeToRefs(useSettingStore())
const naiveLocales = reactive<NLocaleApi>(NAIVE_UI_LOCALES[locale.value])

</script>

<style scoped></style>
