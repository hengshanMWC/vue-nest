import type { CreateUserDto } from '@lib/dtos'

export function getUserModel(): CreateUserDto {
  return {
    account: '',
    password: '',
    confirmPassword: '',
    phoneNum: '',
    email: '',
    avatar: '',
  }
}
