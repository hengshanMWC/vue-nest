import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'
import type { LOCALES_ENUM } from '@/constant'
import { ENUM_THEME, THEME } from '@/constant'
import { getLocale, setStoreLangFlag } from '@/sdk'
import { getLocales } from '@/locales'

interface HandleSettingStore {
  themeRef: RefValue<ENUM_THEME>
  isDarkRef: globalThis.WritableComputedRef<boolean>
  locale: RefValue<LOCALES_ENUM>
}

export const useSettingStore = defineStore<'setting', HandleSettingStore>(
  'setting',
  () => {
    // 主题
    const isDarkRef = useDark({
      storageKey: THEME,
    })
    const themeRef = computed<ENUM_THEME>(() => isDarkRef.value ? ENUM_THEME.DARK : ENUM_THEME.DEFAULT)

    // 国际化
    const locale = ref<LOCALES_ENUM>(getLocale())
    watch(locale, (value) => {
      getLocales().global.locale = value
      setStoreLangFlag(value)
    })

    return {
      themeRef,
      isDarkRef,
      locale,
    }
  },
)
