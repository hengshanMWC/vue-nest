import axios from 'axios'
import { storeToRefs } from 'pinia'
import { createBusinessRequest } from '@/sdk'
import appConfig from '@/config'
import { updateToken } from '@/api/user'
import { useUserStore } from '@/stores/modules/user'

const config = {
  timeout: Number(appConfig.request.timeout || '0'),
  baseURL: appConfig.api.baseUrl,
}
const request = axios.create(config)
const refreshTokenRequest = axios.create(config)
createBusinessRequest(request, updateToken, {
  error(error) {
    console.log('request', error)
  },
  tokenExpire() {
    const { userInfo } = storeToRefs(useUserStore())
    userInfo.value = null
  },
})

export {
  request,
  refreshTokenRequest,
}
