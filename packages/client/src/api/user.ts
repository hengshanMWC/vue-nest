import type { CreateUserDto, CreateUserResultDto, LoginUserDto, UpdatePasswordDto, UpdateUserDto } from '@vue-nest/dtos'
import { userRouterData } from '@vue-nest/routers'
import type { ApiResult } from '.'
import { getRefreshToken } from '@/utils/cache'
import { refreshTokenRequest, request } from '@/helpers/request'
import type { RefreshTokenRequestResult } from '@/sdk'

const {
  childrenGroup,
} = userRouterData

export function register(params: CreateUserDto): ApiResult<typeof CreateUserResultDto> {
  return request.post(childrenGroup.POST_REGISTER, params)
}

export function login(params: LoginUserDto): ApiResult {
  return request.post(childrenGroup.POST_LOGIN, params)
}

export function getUserInfo(id?: string): ApiResult<typeof CreateUserResultDto> {
  return request.get(childrenGroup.GET_INFO, {
    params: {
      id,
    },
  })
}

export function updateUserInfo(params: UpdateUserDto): ApiResult {
  return request.put(childrenGroup.PUT_INFO, params)
}

export function resetPassword(params: UpdatePasswordDto): ApiResult {
  return request.put(childrenGroup.PUT_PASSWORD, params)
}

export function updateToken(): RefreshTokenRequestResult {
  return refreshTokenRequest.post(childrenGroup.POST_UPDATE_TOKEN, {
    headers: { Authorization: `Bearer ${getRefreshToken()}` },
  })
}
