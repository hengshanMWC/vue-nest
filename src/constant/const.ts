import type { LocalesApi, NLocaleApi, ThemeValue } from '@/types'
import { zhCN, dateZhCN, enUS, dateEnUS, zhTW, dateZhTW, jaJP, dateJaJP } from 'naive-ui'
import { ENUM_THEME, LOCALES_ENUM } from '.'
import { darkTheme } from 'naive-ui'

export const NAIVE_UI_LOCALES: LocalesApi<NLocaleApi> = {
	[LOCALES_ENUM.EN_US]: {
		locale: enUS,
		dateLocale: dateEnUS
	},
	[LOCALES_ENUM.ZH_CN]: {
		locale: zhCN,
		dateLocale: dateZhCN
	},
	[LOCALES_ENUM.ZH_TW]: {
		locale: zhTW,
		dateLocale: dateZhTW
	},
	[LOCALES_ENUM.JA_JP]: {
		locale: jaJP,
		dateLocale: dateJaJP
	}
} as const

export const THEME_LIST: Record<ENUM_THEME, ThemeValue> = {
	[ENUM_THEME.DEFAULT]: null,
	[ENUM_THEME.DARK]: darkTheme
} as const
