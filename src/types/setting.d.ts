import type { LOCALES } from "@/constant";
import type { NLocale, NDateLocale } from 'naive-ui'
import type { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'

export type LocalesApi<T = any> = Record<LOCALES, T>

export interface NLocaleApi {
  locale: NLocale
  dateLocale: NDateLocale
}

export type ThemeValue = BuiltInGlobalTheme | null
 