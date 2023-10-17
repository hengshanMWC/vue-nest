import type { NDateLocale, NLocale } from 'naive-ui'
import type { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
import type { LOCALES_ENUM } from '@/constant'

export type LocalesApi<T = any> = Record<LOCALES_ENUM, T>

export interface NLocaleApi {
  locale: NLocale
  dateLocale: NDateLocale
}

export type ThemeValue = BuiltInGlobalTheme | null
