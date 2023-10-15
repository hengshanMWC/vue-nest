/** 配置 */

import { LOCALES } from ".";

export const DEFAULT_LOCALE = LOCALES['EN_US']

export const LEGAL_LOCALES = (Object.keys(LOCALES) as (keyof typeof LOCALES)[]).map(key => LOCALES[key])