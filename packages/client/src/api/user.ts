import type { CreateUserDto, CreateUserResultDto, LoginUserDto, UpdatePasswordDto, UpdateUserDto } from '@lib/dtos'
import { ROUTER_USER_GROUP_BASE } from '@lib/routers'
import type { ApiResult } from '.'
import { getRefreshToken } from '@/utils/cache'
import { refreshTokenRequest, request } from '@/helpers/request'
import type { RefreshTokenRequestResult } from '@/sdk'

export function register(data: CreateUserDto): ApiResult<CreateUserResultDto> {
  return request.post(ROUTER_USER_GROUP_BASE.POST_REGISTER, data)
}

export function login(data: LoginUserDto): ApiResult {
  return request.post(ROUTER_USER_GROUP_BASE.POST_LOGIN, data)
}

export function getUserInfo(id?: string): ApiResult<CreateUserResultDto> {
  return request.get(ROUTER_USER_GROUP_BASE.GET_INFO, {
    params: {
      id,
    },
  })
}

export function updateUserInfo(data: UpdateUserDto): ApiResult {
  return request.put(ROUTER_USER_GROUP_BASE.PUT_INFO, data)
}

export function resetPassword(data: UpdatePasswordDto): ApiResult {
  return request.put(ROUTER_USER_GROUP_BASE.PUT_PASSWORD, data)
}

export function updateToken(): RefreshTokenRequestResult {
  return refreshTokenRequest.post(ROUTER_USER_GROUP_BASE.POST_UPDATE_TOKEN, {
    headers: { Authorization: `Bearer ${getRefreshToken()}` },
  })
}
