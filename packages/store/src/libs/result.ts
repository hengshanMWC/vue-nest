import { ApiProperty } from '@nestjs/swagger'

export interface ResultDataApi<T = undefined> {
  code: number
  msg: string
  data: T
}

export class ResultData<T> implements ResultDataApi<T> {
  constructor(code = 200, msg?: string, data?: T) {
    this.code = code
    this.msg = msg || 'ok'
    this.data = data as T
  }

  @ApiProperty({ type: 'number', default: 200 })
  code: number

  @ApiProperty({ type: 'string', default: 'ok' })
  msg: string

  data: T

  static ok<T>(data?: T, msg?: string): ResultData<T> {
    return new ResultData(200, msg, data)
  }

  static fail<T>(code: number, msg?: string, data?: T): ResultData<T> {
    return new ResultData(code || 500, msg || 'fail', data)
  }
}
