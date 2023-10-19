export interface OssStructureApi {
  userId: string
  userAccount: string
  url: string
  size: number
  type: string
  describes?: string
  location?: string
}

export type OssStructureKeyList = keyof OssStructureApi
