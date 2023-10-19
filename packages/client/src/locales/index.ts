import { type I18n, createI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import enUS from './enUS'
import zhCN from './zhCN'
import zhTW from './zhTW'
import jaJP from './jaJP'
import { LOCALES_ENUM } from '@/constant'
import { useSettingStore } from '@/stores/modules/setting'

let _locales: I18n
function createLocales() {
  const { locale } = storeToRefs(useSettingStore())
  return _locales = createI18n({
    locale: locale.value,
    fallbackLocale: LOCALES_ENUM.EN_US,
    messages: {
      [LOCALES_ENUM.EN_US]: enUS,
      [LOCALES_ENUM.ZH_CN]: zhCN,
      [LOCALES_ENUM.ZH_TW]: zhTW,
      [LOCALES_ENUM.JA_JP]: jaJP,
    },
  })
}
function getLocales() {
  return _locales
}
export { createLocales, getLocales }
