import { UserType } from 'src/common/enums/common.enum'

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
