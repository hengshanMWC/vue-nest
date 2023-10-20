import { UserType } from '@vue-nest/base'
import type {
  GetBaseEntityData,
} from '../../interface'
import { createEntitiesFunc } from '../../utils'
import type { UserStructureKeyList } from './interface'

const getUserEntityData: GetBaseEntityData<UserStructureKeyList> = () => {
  return {
    name: 'sys_user',
    columns: {
      password: {
        name: 'password',
        type: 'varchar',
        comment: '用户登录密码',
        length: 200,
        nullable: false,
      },
      salt: {
        name: 'salt',
        type: 'varchar',
        comment: '盐',
        length: 200,
        nullable: false,
      },
      account: {
        name: 'account',
        type: 'varchar',
        comment: '用户登录账号',
        length: 32,
        nullable: false,
      },
      phoneNum: {
        name: 'phone_num',
        type: 'varchar',
        comment: '手机号',
        length: 20,
        nullable: false,
        default: '',
      },
      email: {
        name: 'email',
        type: 'varchar',
        comment: '邮箱',
        length: 200,
        nullable: false,
        default: '',
      },
      avatar: {
        name: 'avatar',
        type: 'varchar',
        comment: '头像地址',
        nullable: true,
      },
      type: {
        name: 'tinyint',
        type: 'varchar',
        comment: '帐号类型：0-超管， 1-普通用户',
        nullable: false,
        default: UserType.ORDINARY_USER,
      },
    },
  }
}
const {
  getEntityName: getUserEntityName,
  getEntityColumns: getUserEntityColumns,
} = createEntitiesFunc<UserStructureKeyList>(getUserEntityData)
export {
  getUserEntityName,
  getUserEntityColumns,
  getUserEntityData,
}
