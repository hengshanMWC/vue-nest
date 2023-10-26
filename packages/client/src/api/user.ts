import type { CreateTokenResultDto, CreateUserDto, LoginUserDto, UpdatePasswordDto, UpdateUserDto, UserInfoResultDto } from '@lib/dtos'
import { ROUTER_USER_GROUP_BASE } from '@lib/routers'
import errCode from 'err-code'
import { AppHttpCode } from '@lib/base'
import type { ApiResult } from '.'
import { getLoginActive, getRefreshToken, setToken } from '@/utils/cache'
import { refreshTokenRequest, request } from '@/helpers/request'
import type { RefreshTokenRequestResult } from '@/sdk'
import { useUserStore } from '@/stores/modules/user'

export function fetchRegister(data: CreateUserDto): ApiResult {
  return request.post(ROUTER_USER_GROUP_BASE.POST_REGISTER, data)
}

export async function fetchLogin(data: LoginUserDto): ApiResult<CreateTokenResultDto> {
  const res: CreateTokenResultDto = await request.post(ROUTER_USER_GROUP_BASE.POST_LOGIN, data)
  const {
    accessToken,
    refreshToken,
  } = res
  setToken(accessToken, refreshToken)
  return res
}

export async function fetchUserInfo(id?: string): ApiResult<UserInfoResultDto> {
  if (!getLoginActive())
    return Promise.reject(errCode(new Error('请先登录'), String(AppHttpCode.REJECT)))

  const { reset } = useUserStore()
  const res: UserInfoResultDto = await request.get(ROUTER_USER_GROUP_BASE.GET_INFO, {
    params: {
      id,
    },
  })
  reset(res)
  return res
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
