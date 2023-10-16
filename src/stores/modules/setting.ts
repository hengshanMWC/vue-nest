import { watch, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { darkTheme } from 'naive-ui'
import { ENUM_THEME, LOCALES } from '@/constant'
import type { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
import { getLocale, setStoreLangFlag } from '@/sdk'
import { getLocales } from '@/locales'
type ThemeValue = BuiltInGlobalTheme | null
interface HandleSetting {
  themeData: Ref<ThemeValue>,
  setTheme: (type: ENUM_THEME) => void,
  locale: Ref<LOCALES>,
}

const themeList: Record<ENUM_THEME, ThemeValue> = {
  [ENUM_THEME.DEFAULT]: null,
  [ENUM_THEME.DARK]: darkTheme,
} as const

export const useSettingStore = defineStore<'setting', HandleSetting>('setting', () => {
  // 主题
  const themeData = ref<ThemeValue>(null)
  function setTheme (type: ENUM_THEME) {
    themeData.value = themeList[type]
  }

  // 国际化
  const locale = ref<LOCALES>(getLocale())
  watch(locale, (value) => {
    getLocales().global.locale = value
    setStoreLangFlag(value)
  })

  return { 
    themeData,
    setTheme,

    locale,
  }
})
