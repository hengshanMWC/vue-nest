import { AppHttpCode } from '@lib/base'
import { ApiProperty } from '@nestjs/swagger'

export class ResultData {
  constructor(code = AppHttpCode.SUCCESS, msg?: string, data?: any) {
    this.code = code
    this.msg = msg || 'ok'
    this.data = data || null
  }

  @ApiProperty({ type: 'number', default: AppHttpCode.SUCCESS })
  code: number

  @ApiProperty({ type: 'string', default: 'ok' })
  msg?: string

  data?: any

  static ok(data?: any, msg?: string): ResultData {
    return new ResultData(AppHttpCode.SUCCESS, msg, data)
  }

  static fail(code: number, msg?: string, data?: any): ResultData {
    return new ResultData(code || AppHttpCode.ERROR, msg || 'fail', data)
  }
}
