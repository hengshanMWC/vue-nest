import type { ResultDataApi } from '@lib/store'

export * from './user'
export type ApiResult<T = null> = Promise<ResultDataApi<T>>
