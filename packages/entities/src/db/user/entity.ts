import { Column, Entity } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { $enum } from 'ts-enum-util'

import { UserType } from '@vue-nest/store'
import type { UserStructureApi } from '@vue-nest/store'
import { BaseEntity } from '../../base/entity'
import { getUserEntityColumns, getUserEntityName } from './constant'

const {
  password,
  salt,
  account,
  phoneNum,
  email,
  avatar,
  type,
} = getUserEntityColumns()
@Entity(getUserEntityName())
export class UserEntity extends BaseEntity implements UserStructureApi {
  @Exclude({ toPlainOnly: true }) // 输出屏蔽密码
  @Column(password)
  public password: string

  @Exclude({ toPlainOnly: true }) // 输出屏蔽盐
  @Column(salt)
  public salt: string

  @ApiProperty({ type: String, description: account.comment })
  @Column(account)
  public account: string

  @ApiProperty({ type: String, description: phoneNum.comment })
  @Column(phoneNum)
  public phoneNum: string

  @ApiProperty({ type: String, description: email.comment })
  @Column(email)
  public email: string

  @ApiProperty({ type: String, description: avatar.comment })
  @Column(avatar)
  public avatar: string

  @ApiProperty({
    type: Number,
    description: type.comment,
    enum: $enum(UserType).getValues(),
  })
  @Column(type)
  public type: UserType
}
