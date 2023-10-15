import { createI18n } from 'vue-i18n'
import enUS from './enUS'
import zhCN from './zhCN'
import zhTW from './zhTW'
import jaJP from './jaJP'
import { LOCALES } from '@/constant'
import { getLocale } from '@/sdk/locale'
const i18n = createI18n({
  locale: getLocale(),
  fallbackLocale: LOCALES.EN_US,
  messages: {
    [LOCALES.EN_US]:enUS,
    [LOCALES.ZH_CN]:zhCN,
    [LOCALES.ZH_TW]:zhTW,
    [LOCALES.JA_JP]:jaJP
  }
})

export {
  i18n
}