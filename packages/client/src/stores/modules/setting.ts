import { defineStore } from 'pinia'
import type { LOCALES_ENUM } from '@/constant'
import { ENUM_THEME, THEME } from '@/constant'
import { getLocale, setStoreLangFlag } from '@/sdk'
import { getLocales } from '@/locales'

interface HandleSettingStore {
  themeRef: RefValue<ENUM_THEME>
  setTheme: (type: ENUM_THEME) => void
  locale: RefValue<LOCALES_ENUM>
}

export const useSettingStore = defineStore<'setting', HandleSettingStore>(
  'setting',
  () => {
    // 主题
    const themeStorage = localStorage.getItem(THEME) as ENUM_THEME
    const themeRef = ref<ENUM_THEME>(themeStorage || ENUM_THEME.DEFAULT)
    watch(themeRef, (value) => {
      localStorage.setItem(THEME, value)
    })
    function setTheme(type: ENUM_THEME) {
      themeRef.value = type
      localStorage.setItem(THEME, type)
    }

    // 国际化
    const locale = ref<LOCALES_ENUM>(getLocale())
    watch(locale, (value) => {
      getLocales().global.locale = value
      setStoreLangFlag(value)
    })

    return {
      themeRef,
      setTheme,

      locale,
    }
  },
)
