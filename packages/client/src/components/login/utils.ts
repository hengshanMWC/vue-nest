import type { LoginUserDto } from '@lib/dtos'
import type { FormRules } from 'naive-ui'

export function getLoginRules(): FormRules {
  return {
    account: [
      {
        required: true,
        message: '请输入账号',
        trigger: ['input', 'blur'],
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: ['input', 'blur'],
      },
    ],
  }
}

export function getLoginModel(): LoginUserDto {
  return {
    account: '',
    password: '',
  }
}
