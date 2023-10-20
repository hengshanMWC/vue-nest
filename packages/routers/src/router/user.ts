import { createRouterProxy } from '../utils'

export const USER_ROUTER = {
  POST_LOGIN: 'login',
  POST_REGISTER: 'register',
  POST_UPDATE_TOKEN: 'update/token',
  GET_INFO: 'info',
  PUT_INFO: 'info',
  PUT_PASSWORD: '/password/reset',
} as const

export const userRouterData = createRouterProxy({
  base: 'user',
  childrenGroup: {
    ...USER_ROUTER,
  },
})
