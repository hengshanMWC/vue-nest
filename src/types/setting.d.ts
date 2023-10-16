import type { LOCALES } from "@/constant";

export type LocalesKey = keyof typeof LOCALES;

export type LocalesApi<T = any> = Record<LocalesKey, T>