import { createI18n, type I18n } from 'vue-i18n'
import enUS from './enUS'
import zhCN from './zhCN'
import zhTW from './zhTW'
import jaJP from './jaJP'
import { LOCALES } from '@/constant'
import { useSettingStore } from '@/stores/modules/setting'
import { storeToRefs } from 'pinia'
let _locales: I18n
function createLocales() {
  const { locale } = storeToRefs(useSettingStore())
  _locales = createI18n({
    locale: locale.value,
    fallbackLocale: LOCALES.EN_US,
    messages: {
      [LOCALES.EN_US]: enUS,
      [LOCALES.ZH_CN]: zhCN,
      [LOCALES.ZH_TW]: zhTW,
      [LOCALES.JA_JP]: jaJP
    }
  })
  return _locales
}
function getLocales () {
  return _locales
}
export {
  createLocales,
  getLocales
}