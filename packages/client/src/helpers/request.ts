import axios from 'axios'
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
  error(error) {
    console.log('request', error)
  },
  tokenExpire() {
    const userStore = useUserStore()
    userStore.reset()
  },
})

export {
  request,
  refreshTokenRequest,
}
