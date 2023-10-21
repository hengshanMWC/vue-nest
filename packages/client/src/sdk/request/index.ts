import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import type { CreateTokenResultDto } from '@lib/dtos'
import { getRTExp, getToken, setToken } from '@/utils/cache'

import type { ApiResult } from '@/api'

export type RefreshTokenRequestResult = ApiResult<CreateTokenResultDto>
export interface RequestEvent {
  error?: (error: Error) => void
  tokenExpire?: (error: AxiosError<any>) => void
  serverError?: (error: AxiosError<any>) => void
}
export function createBusinessRequest(
  request: AxiosInstance,
  refreshTokenRequest: () => RefreshTokenRequestResult,
  on: RequestEvent = {},
) {
  let refreshTokenRequestResult: RefreshTokenRequestResult | null = null
  request.interceptors.request.use(async (config) => {
    const token = getToken()

    if (token && !config.headers.Authorization)
      config.headers.Authorization = token

    if (refreshTokenRequestResult)
      await refreshTokenRequestResult

    return config
  })

  request.interceptors.response.use(
    (response) => {
      const res = response?.data
      // res 有值
      if (res || response.config?.responseType === 'blob')
        return res

      return null
    },
    async (error: AxiosError<any>) => {
      const response = error.response
      const config = response?.config as AxiosRequestConfig
      if (response?.status === 401) {
        if (getRTExp() <= Date.now()) {
          on.tokenExpire && on.tokenExpire(error)
        }
        else if (!refreshTokenRequestResult) {
          try {
            refreshTokenRequestResult = refreshTokenRequest()
            const res = await refreshTokenRequestResult
            if (res?.code === 200) {
              const data = res.data
              setToken(data.accessToken, data.refreshToken)
              // 返回触发 401 接口正常结果
              config.headers = { ...config.headers, Authorization: data.accessToken }
              return await request(config)
            }
          }
          catch (error) {
            on.error && on.error(error as Error)
          }
          finally {
            refreshTokenRequestResult = null
          }
        }
        else {
          // 刷新 token 期间，将其他请求存入队列，刷新成功之后重新请求一次
          const res = await refreshTokenRequestResult
          config.headers = { ...config.headers, Authorization: res.data.accessToken }
          return await request(config)
        }
      }
      else {
        on.tokenExpire && on.tokenExpire(error)
        // ElNotification({
        //   title: '服务端错误',
        //   dangerouslyUseHTMLString: true,
        //   message: `<div style="color: var(--el-color-error, red);">${response?.data?.msg || error.message}</div>`,
        //   position: 'bottom-right',
        //   duration: 3000,
        // })
      }
    },
  )
}
