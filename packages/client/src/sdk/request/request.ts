import type { AxiosError, AxiosRequestConfig } from 'axios'
import { storeToRefs } from 'pinia'
import { createRequest } from './utils'
import { getRTExp, getToken, setToken } from '@/utils/cache'

import { updateToken } from '@/api/user'
import { useUserStore } from '@/stores/modules/user'

export function createBusinessRequest() {
  let isRefreshing = false
  let retryRequest: any[] = []
  const request = createRequest()
  request.interceptors.request.use((config) => {
    const token = getToken()
    if (token && !config.headers.Authorization)
      config.headers.Authorization = token

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
          // 刷新token 过期了
          const { userInfo } = storeToRefs(useUserStore())
          userInfo.value = null
        }
        else if (!isRefreshing) {
          try {
            isRefreshing = true
            const res = await updateToken()
            if (res?.code === 200) {
              const data = res.data
              setToken(data.accessToken, data.refreshToken)
              // 队列中的请求刷新成功后，再请求一次
              for (let i = 0, len = retryRequest.length; i < len; i++)
                retryRequest[i](data.accessToken)

              // 队列请求完成，清空
              retryRequest = []
              // 返回触发 401 接口正常结果
              config.headers = { ...config.headers, Authorization: data.accessToken }
              return await request(config)
            }
          }
          catch (error) {
            console.log(error)
          }
          finally {
            isRefreshing = false
          }
        }
        else {
          // 刷新 token 期间，将其他请求存入队列，刷新成功之后重新请求一次
          return new Promise((resolve) => {
            retryRequest.push((token: string) => {
              config.headers = { ...config.headers, Authorization: token }
              resolve(request(config))
            })
          })
        }
      }
      else {
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
  return request
}
