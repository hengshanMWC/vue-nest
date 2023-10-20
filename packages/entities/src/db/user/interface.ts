import type { UserType } from '@vue-nest/base'

export interface UserStructureApi {
  password: string
  salt: string
  account: string
  phoneNum: string
  email: string
  avatar?: string
  type: UserType
}

export type UserStructureKeyList = keyof UserStructureApi
