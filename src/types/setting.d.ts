import type { LOCALES } from "@/constant";
import type { NLocale, NDateLocale } from 'naive-ui'

export type LocalesApi<T = any> = Record<LOCALES, T>

export interface NLocaleApi {
  locale: NLocale
  dateLocale: NDateLocale
}