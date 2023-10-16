import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { darkTheme } from 'naive-ui'
import { ENUM_THEME } from '@/constant'
import type { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
type ThemeValue = BuiltInGlobalTheme | null
interface HandleSetting {
  themeData: Ref<ThemeValue>,
  setTheme: (type: ENUM_THEME) => void,
}

const themeList: Record<ENUM_THEME, ThemeValue> = {
  [ENUM_THEME.DEFAULT]: null,
  [ENUM_THEME.DARK]: darkTheme
} as const

export const useSettingStore = defineStore<'setting', HandleSetting>('setting', () => {
  // 主题
  const themeData = ref<ThemeValue>(null)
  function setTheme (type: ENUM_THEME) {
    themeData.value = themeList[type]
  }

  // 国际化
  // const 

  return { 
    themeData,
    setTheme 
  }
})
