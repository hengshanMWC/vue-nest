import axios from 'axios'
import appConfig from '@/config'

function createRequest() {
  return axios.create({
    timeout: Number(appConfig.request.timeout || '0'),
    baseURL: appConfig.api.baseUrl,
  })
}

export {
  createRequest,
}
