declare interface Navigator {
  browserLanguage: string
  userLanguage: string
  systemLanguage: string
}

/**
 * 直接用Ref会报
 * Property 'themeRef' of exported interface has or is using private name 'Ref'.
 * 要么引入，要么用RefValue这个别名
 */
type RefValue<T = any> = Ref<T>
