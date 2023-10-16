import type { LocalesApi, NLocaleApi } from '@/types'
import { zhCN, dateZhCN, enUS, dateEnUS, zhTW, dateZhTW, jaJP, dateJaJP } from 'naive-ui'
import { LOCALES } from '.'
export const NAIVE_UI_LOCALES: LocalesApi<NLocaleApi> = {
  [LOCALES.EN_US]: {
    locale: enUS,
    dateLocale: dateEnUS
  },
  [LOCALES.ZH_CN]: {
    locale: zhCN,
    dateLocale: dateZhCN
  },
  [LOCALES.ZH_TW]: {
    locale: zhTW,
    dateLocale: dateZhTW
  },
  [LOCALES.JA_JP]: {
    locale: jaJP,
    dateLocale: dateJaJP
  },
} as const