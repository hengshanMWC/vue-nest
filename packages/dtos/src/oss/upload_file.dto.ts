import { OssEntity } from '@lib/entities'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateUploadFileDto<T> {
  @ApiProperty({ description: '上传文件，可以传数组' })
  @IsNotEmpty({ message: 'file 不能为空' })
  file: T

  @ApiProperty({ description: '文件描述' })
  business?: string
}

export class CreateUploadFileResultDto extends OssEntity {}
