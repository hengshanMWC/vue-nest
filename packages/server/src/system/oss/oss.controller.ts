import { Body, Controller, HttpCode, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'

import { OssEntity } from '@vue-nest/entities'
import { ossRouterData } from '@vue-nest/store'
import { ResultData } from '../../helpers/utils/result'

import { ApiResult } from '../../helpers/decorators/api-result.decorator'
import { OssService } from './oss.service'

const {
  base,
  childrenGroup,
} = ossRouterData
@ApiTags('文件存储')
@ApiBearerAuth()
@Controller(base)
export class OssController {
  constructor(private readonly ossService: OssService) {}

  @Post(childrenGroup.POST_UPLOAD)
  @ApiOperation({ summary: '文件上传,返回 url 地址' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          description: '文件',
          type: 'string',
          format: 'binary',
        },
        business: {
          description: '上传文件描述，可以是纯字符串，也可以是JSON字符串',
          type: 'string',
          format: 'text',
        },
      },
    },
  })
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  @ApiResult(OssEntity)
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() params: { business: string },
    @Req() req,
  ): Promise<ResultData> {
    return await this.ossService.create(file, params.business || '', req.user)
  }
}
