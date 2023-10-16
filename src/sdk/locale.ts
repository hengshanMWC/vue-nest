/*
 * 国际化处理
 * 需要考虑国际化的地方有
 * - 组件, 如国家列表
 * - 用户协议等法务html文件对应的语种(外部提供)
 * - 更新语言的时候需要更新此列表内的所有参数
 */

import { LOCALES, DEFAULT_LOCALE, LEGAL_LOCALES, LANG_FLAG } from "@/constant";
import { getURLSearchParams } from "@/utils/url";
import { isNull } from "lodash-es";

const handleStoreLangFlag = () => {
  const value = localStorage.getItem(LANG_FLAG);
  const langFlag = isNull(value) ? '' : value;
  console.log(LANG_FLAG, langFlag);
  if (LEGAL_LOCALES.includes(langFlag as LOCALES)) {
    return langFlag;
  }
};

const handleUrlLangFlag = () => {
  const value = getURLSearchParams(LANG_FLAG);
  const langFlag = typeof value === 'object' ? '' : value;
  console.log(LANG_FLAG, langFlag);
  if (LEGAL_LOCALES.includes(langFlag as LOCALES)) {
    return langFlag;
  }
};

const handleBrowserLanguage = () => {
  const language = (
    navigator.language || navigator.browserLanguage
  ).toLowerCase();
  const browserLang = parseNavigatorLanguage(language);
  console.log('browserLang', browserLang);
  if (LEGAL_LOCALES.includes(browserLang)) {
    return browserLang;
  }
};

const handleSystemLanguage = () => {
  const language = navigator.userLanguage || navigator.systemLanguage;
  const systemLang = parseNavigatorLanguage(language);
  console.log('systemLang', systemLang);
  if (LEGAL_LOCALES.includes(systemLang)) {
    return systemLang;
  }
};

// 各浏览器对 navigator 对象中几个与语言相关的属性的返回值存在差异, 需要兼容处理
function parseNavigatorLanguage(language: string): LOCALES {
  const CHINESE_LANGUAGE_GROUP = ['zh-hk', 'zh-tw', 'zh-sg'];
  const JA_GROUP = ['ja-jp', 'ja'];
  if (CHINESE_LANGUAGE_GROUP.includes(language)) {
    return LOCALES.ZH_TW
  } else if (JA_GROUP.includes(language)) {
    return LOCALES.JA_JP;
  } else if (language === 'zh-cn') {
    return LOCALES.ZH_CN;
  } else {
    return language as LOCALES
  }
}

const handleDefaultLanguage = () => {
  console.log('defaultLang', DEFAULT_LOCALE);
  return DEFAULT_LOCALE;
};

function getLocale(): LOCALES {
  const arr = [
    handleStoreLangFlag,
    handleUrlLangFlag,
    handleBrowserLanguage,
    handleSystemLanguage,
    handleDefaultLanguage,
  ];
  let value;
  for (let i = 0; i < arr.length; i++) {
    value = arr[i]();
    if (value) break;
  }
  return value as LOCALES;
}

const setStoreLangFlag = (value: LOCALES) => {
  localStorage.setItem(LANG_FLAG, value);
}

export { getLocale, setStoreLangFlag }
