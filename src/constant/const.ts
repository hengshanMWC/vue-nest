import { darkTheme, dateEnUS, dateJaJP, dateZhCN, dateZhTW, enUS, jaJP, zhCN, zhTW } from 'naive-ui'
import { ENUM_THEME, LOCALES_ENUM } from '.'
import type { LocalesApi, NLocaleApi, ThemeValue } from '@/types'

export const NAIVE_UI_LOCALES: LocalesApi<NLocaleApi> = {
  [LOCALES_ENUM.EN_US]: {
    locale: enUS,
    dateLocale: dateEnUS,
  },
  [LOCALES_ENUM.ZH_CN]: {
    locale: zhCN,
    dateLocale: dateZhCN,
  },
  [LOCALES_ENUM.ZH_TW]: {
    locale: zhTW,
    dateLocale: dateZhTW,
  },
  [LOCALES_ENUM.JA_JP]: {
    locale: jaJP,
    dateLocale: dateJaJP,
  },
} as const

export const THEME_LIST: Record<ENUM_THEME, ThemeValue> = {
  [ENUM_THEME.DEFAULT]: null,
  [ENUM_THEME.DARK]: darkTheme,
} as const
