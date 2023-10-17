/*
 * 国际化处理
 * 需要考虑国际化的地方有
 * - 组件, 如国家列表
 * - 用户协议等法务html文件对应的语种(外部提供)
 * - 更新语言的时候需要更新此列表内的所有参数
 */

import { isNull } from 'lodash-es'
import { DEFAULT_LOCALE, LANG_FLAG, LEGAL_LOCALES, LOCALES_ENUM } from '@/constant'
import { getURLSearchParams } from '@/utils/url'

function handleStoreLangFlag() {
  const value = localStorage.getItem(LANG_FLAG)
  const langFlag = isNull(value) ? '' : value
  console.log(LANG_FLAG, langFlag)
  if (LEGAL_LOCALES.includes(langFlag as LOCALES_ENUM)) {
    return langFlag
  }
}
function handleUrlLangFlag() {
  const value = getURLSearchParams(LANG_FLAG)
  const langFlag = typeof value === 'object' ? '' : value
  console.log(LANG_FLAG, langFlag)
  if (LEGAL_LOCALES.includes(langFlag as LOCALES_ENUM)) {
    return langFlag
  }
}

function handleBrowserLanguage() {
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const browserLang = parseNavigatorLanguage(language)
  console.log('browserLang', browserLang)
  if (LEGAL_LOCALES.includes(browserLang)) {
    return browserLang
  }
}

function handleSystemLanguage() {
  const language = navigator.userLanguage || navigator.systemLanguage
  const systemLang = parseNavigatorLanguage(language)
  console.log('systemLang', systemLang)
  if (LEGAL_LOCALES.includes(systemLang)) {
    return systemLang
  }
}

// 各浏览器对 navigator 对象中几个与语言相关的属性的返回值存在差异, 需要兼容处理
function parseNavigatorLanguage(language: string): LOCALES_ENUM {
  const CHINESE_LANGUAGE_GROUP = ['zh-hk', 'zh-tw', 'zh-sg']
  const JA_GROUP = ['ja-jp', 'ja']
  if (CHINESE_LANGUAGE_GROUP.includes(language)) {
    return LOCALES_ENUM.ZH_TW
  }
  else if (JA_GROUP.includes(language)) {
    return LOCALES_ENUM.JA_JP
  }
  else if (language === 'zh-cn') {
    return LOCALES_ENUM.ZH_CN
  }
  else {
    return language as LOCALES_ENUM
  }
}

function handleDefaultLanguage() {
  console.log('defaultLang', DEFAULT_LOCALE)
  return DEFAULT_LOCALE
}

function getLocale(): LOCALES_ENUM {
  const arr = [
    handleStoreLangFlag, // 本地储存
    handleUrlLangFlag, // url query
    handleBrowserLanguage, // 浏览器
    handleSystemLanguage, // 系统
    handleDefaultLanguage, // 默认
  ]
  let value
  for (let i = 0; i < arr.length; i++) {
    value = arr[i]()
    if (value)
      break
  }
  return value as LOCALES_ENUM
}

function setStoreLangFlag(value: LOCALES_ENUM) {
  localStorage.setItem(LANG_FLAG, value)
}

export { getLocale, setStoreLangFlag }
