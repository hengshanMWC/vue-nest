import type { CreateTokenDto, ResultDataApi } from '@vue-nest/store'
import { request } from '@/sdk'
import { getRefreshToken } from '@/utils/cache'

export function updateToken(): Promise<ResultDataApi<CreateTokenDto>> {
  return request.post('/update/token', {
    headers: { Authorization: `Bearer ${getRefreshToken()}` },
  })
}
