import axios from 'axios'
import { useMessage } from 'naive-ui'
import { createBusinessRequest } from '@/sdk'
import appConfig from '@/config'
import { fetchUpdateToken } from '@/api/user'
import { useUserStore } from '@/stores/modules/user'

const config = {
  timeout: Number(appConfig.request.timeout || '0'),
  baseURL: appConfig.api.baseUrl,
}

const request = axios.create(config)
const refreshTokenRequest = axios.create(config)

createBusinessRequest(request, fetchUpdateToken, {
  tokenExpire() {
    const userStore = useUserStore()
    userStore.reset()
  },
  serverError(error) {
    const message = useMessage()
    if (error.code === 500) {
      message.error('网络错误!')
    } else if (error.code === 404) {
      message.error('接口404')
    } else if (error.code === 429) {
      console.log('request are too fast')
      message.error('您太快了,请稍后重试!')
    } else if (error.code === 403) {
      console.log('forbidden request')
      message.error('您无权访问')
    } else if (error.code === 400 || error.code === 422) {
      message.error(error.response.data.message)
    }
  },
  error(error) {
    console.log('request error', error)
  },
})

export { request, refreshTokenRequest }
