import { getRefreshToken } from '@/utils/cache'
import { refreshTokenRequest, request } from '@/helpers/request'
import type { RefreshTokenRequestResult } from '@/sdk'

export function fetchUpdateToken(): RefreshTokenRequestResult {
  return refreshTokenRequest.post('/update/token', {
    headers: { Authorization: `Bearer ${getRefreshToken()}` },
  })
}

// export function login(params: LoginUserDto): ApiResult<CreateTokenDto> {
return request.post(params)
// }
