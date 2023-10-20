import { createRouterProxy } from '../utils'

export const OSS_ROUTER = {
  POST_UPLOAD: 'upload',
} as const

export const ossRouterData = createRouterProxy({
  base: 'oss',
  childrenGroup: {
    ...OSS_ROUTER,
  },
})
