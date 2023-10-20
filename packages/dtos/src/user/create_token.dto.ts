import { ApiProperty } from '@nestjs/swagger'

export class CreateTokenResultDto {
  @ApiProperty({ description: 'token' })
  accessToken: string

  @ApiProperty({ description: '刷新 token' })
  refreshToken: string
}
