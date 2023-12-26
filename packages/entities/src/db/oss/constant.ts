import type { GetBaseEntityData } from '../../interface'
import { createEntitiesFunc } from '../../utils'
import type { OssStructureKeyList } from './interface'

const getOssEntityData: GetBaseEntityData<OssStructureKeyList> = () => {
  return {
    name: 'sys_oss',
    columns: {
      userId: {
        name: 'user_id',
        type: 'bigint',
        comment: '上传用户id',
        nullable: false,
      },
      userAccount: {
        name: 'user_account',
        type: 'varchar',
        comment: '上传用户帐号',
        length: 32,
        nullable: false,
      },
      url: {
        name: 'url',
        type: 'varchar',
        comment: '文件 url',
        nullable: false,
      },
      size: {
        name: 'size',
        type: 'int',
        comment: '文件size',
        nullable: false,
      },
      type: {
        name: 'type',
        type: 'varchar',
        comment: '文件mimetype类型',
        nullable: false,
      },
      describes: {
        name: 'describes',
        type: 'varchar',
        comment: '业务描述字段，可以字符串，也可以是 JSON 字符串',
        nullable: true,
        length: 200,
      },
      location: {
        name: 'location',
        type: 'varchar',
        comment: '文件存放位置',
        nullable: false,
        length: 200,
      },
    },
  }
}

const {
  getEntityName: getOssEntityName,
  getEntityColumns: getOssEntityColumns,
} = createEntitiesFunc<OssStructureKeyList>(getOssEntityData)

export { getOssEntityName, getOssEntityColumns, getOssEntityData }
