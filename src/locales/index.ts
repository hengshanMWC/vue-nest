import { createI18n, type I18n } from 'vue-i18n'
import enUS from './enUS'
import zhCN from './zhCN'
import zhTW from './zhTW'
import jaJP from './jaJP'
import { LOCALES_ENUM } from '@/constant'
import { useSettingStore } from '@/stores/modules/setting'
import { storeToRefs } from 'pinia'
let _locales: I18n
function createLocales() {
	const { locale } = storeToRefs(useSettingStore())
	_locales = createI18n({
		locale: locale.value,
		fallbackLocale: LOCALES_ENUM.EN_US,
		messages: {
			[LOCALES_ENUM.EN_US]: enUS,
			[LOCALES_ENUM.ZH_CN]: zhCN,
			[LOCALES_ENUM.ZH_TW]: zhTW,
			[LOCALES_ENUM.JA_JP]: jaJP
		}
	})
	return _locales
}
function getLocales() {
	return _locales
}
export { createLocales, getLocales }
