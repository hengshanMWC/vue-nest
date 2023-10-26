import type { CreateTokenResultDto, CreateUserDto, LoginUserDto, UpdatePasswordDto, UpdateUserDto, UserInfoResultDto } from '@lib/dtos'
import { ROUTER_USER_GROUP_BASE } from '@lib/routers'
import type { ApiResult } from '.'
import { getRefreshToken } from '@/utils/cache'
import { refreshTokenRequest, request } from '@/helpers/request'
import type { RefreshTokenRequestResult } from '@/sdk'

export function fetchRegister(data: CreateUserDto): ApiResult {
  return request.post(ROUTER_USER_GROUP_BASE.POST_REGISTER, data)
}

export function fetchLogin(data: LoginUserDto): ApiResult<CreateTokenResultDto> {
  return request.post(ROUTER_USER_GROUP_BASE.POST_LOGIN, data)
}

export function fetchUserInfo(id?: string): ApiResult<UserInfoResultDto> {
  return request.get(ROUTER_USER_GROUP_BASE.GET_INFO, {
    params: {
      id,
    },
  })
}

export function fetchUpdateUserInfo(data: UpdateUserDto): ApiResult {
  return request.put(ROUTER_USER_GROUP_BASE.PUT_INFO, data)
}

export function fetchResetPassword(data: UpdatePasswordDto): ApiResult {
  return request.put(ROUTER_USER_GROUP_BASE.PUT_PASSWORD, data)
}

export function fetchUpdateToken(): RefreshTokenRequestResult {
  return refreshTokenRequest.post(ROUTER_USER_GROUP_BASE.POST_UPDATE_TOKEN, {
    headers: { Authorization: `Bearer ${getRefreshToken()}` },
  })
}
