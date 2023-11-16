import { pick } from 'lodash-es'
import type { UpdateUserDto } from '@lib/dtos'
import type { FormRules } from 'naive-ui'
import { getUserModel } from '../base'

export const upDateUserInfoKeyList = ['avatar']

export function getRegisterModel(): UpdateUserDto {
  return pick(getUserModel(), 'avatar')
}

export function getRegisterRules(modelData: UpdateUserDto): FormRules {
  const accountMinLength = 5
  const passwordMinLength = 8
  return {
    account: [
      {
        required: true,
        message: '请输入账号',
        trigger: ['input', 'blur'],
      },
      {
        min: accountMinLength,
        message: '账号不小于5位数',
        trigger: ['input', 'blur'],
      },
    ],
    password: [
      {
        required: true,
        validator(rule, value: string) {
          if (!value.length)
            return new Error('请输入密码')

          else if (value.length < passwordMinLength)
            return new Error('密码不能少于8位数')

          return true
        },
        trigger: ['input', 'blur'],
      },
    ],
    confirmPassword: [
      {
        required: true,
        validator(rule, value: string) {
          if (!value.length)
            return new Error('请输入二次确认密码')
          else if (value !== modelData.password)
            return new Error('两次密码输入不一致')

          return true
        },
        trigger: ['input', 'blur'],
      },
    ],
    phoneNum: [
      {
        required: true,
        message: '手机号码不能为空',
        trigger: ['input', 'blur'],
      },
      {
        pattern: /^1[3-9]\d{9}$/,
        message: '请输入正确的手机号码格式',
        trigger: ['input', 'blur'],
      },
    ],
    email: [
      {
        type: 'email',
        message: '请输入有效的电子邮件地址',
        trigger: ['input', 'blur'],
      },
    ],
  }
}
