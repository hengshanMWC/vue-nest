import { routerMerge } from './utils'

export const ROUTER_OSS_GROUP = {
  POST_UPLOAD: 'upload',
} as const

export const ROUTER_OSS_BASE = 'oss'

export const ROUTER_OSS_GROUP_BASE = routerMerge(ROUTER_OSS_BASE, ROUTER_OSS_GROUP)
