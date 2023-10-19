import {
  GetBaseEntityColumns,
  GetBaseEntityData,
  GetBaseEntityName,
} from '../../interface'
import { OssStructureKeyList } from './interface'

export const getOssEntityData: GetBaseEntityData<OssStructureKeyList> = () => {
  return {
    name: 'sys_oss',
    columns: {
      userId: {
        name: 'user_id',
        type: 'bigint',
        comment: '上传用户id',
        nullable: true,
      },
      userAccount: {
        name: 'user_account',
        type: 'varchar',
        comment: '上传用户帐号',
        length: 32,
        nullable: true,
      },
      url: {
        name: 'url',
        type: 'varchar',
        comment: '文件 url',
        nullable: true,
      },
      size: {
        name: 'size',
        type: 'int',
        comment: '文件size',
        nullable: true,
      },
      type: {
        name: 'type',
        type: 'varchar',
        comment: '文件mimetype类型',
        nullable: true,
      },
      describes: {
        name: 'type',
        type: 'varchar',
        comment: '业务描述字段，可以字符串，也可以是 JSON 字符串',
        nullable: false,
        length: 200,
      },
      location: {
        name: 'location',
        type: 'varchar',
        comment: '文件存放位置',
        nullable: true,
        length: 200,
      },
    },
  }
}

export const getOssEntityName: GetBaseEntityName<OssStructureKeyList> = () => {
  return getOssEntityData().name
}

export const getOssEntityColumns: GetBaseEntityColumns<
  OssStructureKeyList
> = () => {
  return getOssEntityData().columns
}
