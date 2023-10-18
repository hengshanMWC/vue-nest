/** 配置 */

import { LOCALES_ENUM } from '.'

export const DEFAULT_LOCALE = LOCALES_ENUM['EN_US']

export const LEGAL_LOCALES = (
  Object.keys(LOCALES_ENUM) as (keyof typeof LOCALES_ENUM)[]
).map(key => LOCALES_ENUM[key])
