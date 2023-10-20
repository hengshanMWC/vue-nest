import type { ResultDataApi } from '@vue-nest/store'

export * from './user'
export type ApiResult<T> = Promise<ResultDataApi<T>>
