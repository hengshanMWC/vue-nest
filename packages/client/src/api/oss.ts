import { ROUTER_OSS_GROUP_BASE } from '@lib/routers'
import type { CreateUploadFileDto, CreateUploadFileResultDto } from '@lib/dtos'
import type { ApiResult } from '.'
import { request } from '@/helpers/request'

export function fetchUploadFile(
  data: CreateUploadFileDto<File>,
): ApiResult<typeof CreateUploadFileResultDto> {
  return request.post(ROUTER_OSS_GROUP_BASE.POST_UPLOAD, data)
}
