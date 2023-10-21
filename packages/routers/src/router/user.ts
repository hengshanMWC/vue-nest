import { routerMerge } from './utils'

export const ROUTER_USER_GROUP = {
  POST_LOGIN: 'login',
  POST_REGISTER: 'register',
  POST_UPDATE_TOKEN: 'update/token',
  GET_INFO: 'info',
  PUT_INFO: 'info',
  PUT_PASSWORD: 'password/reset',
} as const

export const ROUTER_USER_BASE = 'user'

export const ROUTER_USER_GROUP_BASE = routerMerge(ROUTER_USER_BASE, ROUTER_USER_GROUP)
