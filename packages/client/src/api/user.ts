import { userRouterData } from '@vue-nest/store'
import { getRefreshToken } from '@/utils/cache'
import { refreshTokenRequest } from '@/helpers/request'
import type { RefreshTokenRequestResult } from '@/sdk'

const {
  childrenGroup,
} = userRouterData
export function fetchUpdateToken(): RefreshTokenRequestResult {
  return refreshTokenRequest.post(childrenGroup.POST_UPDATE_TOKEN, {
    headers: { Authorization: `Bearer ${getRefreshToken()}` },
  })
}

// export function login(params: LoginUserDto): ApiResult<user> {
//   return request.post(params)
// }
