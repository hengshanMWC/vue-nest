import { watch, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { ENUM_THEME, LOCALES, THEME } from '@/constant'
import { getLocale, setStoreLangFlag } from '@/sdk'
import { getLocales } from '@/locales'
interface HandleSetting {
  themeRef: Ref<ENUM_THEME>,
  setTheme: (type: ENUM_THEME) => void,
  locale: Ref<LOCALES>,
}

export const useSettingStore = defineStore<'setting', HandleSetting>('setting', () => {
  // 主题
  const themeStorage = localStorage.getItem(THEME) as ENUM_THEME
  const themeRef = ref<ENUM_THEME>(themeStorage ? themeStorage : ENUM_THEME.DEFAULT)
  watch(themeRef, (value) => {
    localStorage.setItem(THEME, value)
  })
  function setTheme (type: ENUM_THEME) {
    themeRef.value = type
    localStorage.setItem(THEME, type)
  }

  // 国际化
  const locale = ref<LOCALES>(getLocale())
  watch(locale, (value) => {
    getLocales().global.locale = value
    setStoreLangFlag(value)
  })

  return { 
    themeRef,
    setTheme,

    locale,
  }
})
