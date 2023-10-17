<template>
	<n-config-provider
		:locale="naiveLocales.locale"
		:date-locale="naiveLocales.dateLocale"
		:theme="THEME_LIST[themeRef]"
	>
		<RouterView />
	</n-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NAIVE_UI_LOCALES, THEME_LIST } from './constant/const'
import type { NLocaleApi } from './types'
import { storeToRefs } from 'pinia'
import { useSettingStore } from './stores/modules/setting'
const { locale, themeRef } = storeToRefs(useSettingStore())
const naiveLocales = reactive<NLocaleApi>(NAIVE_UI_LOCALES[locale.value])
</script>

<style scoped></style>
