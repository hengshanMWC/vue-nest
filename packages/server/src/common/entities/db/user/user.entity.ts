import { Column, Entity } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { $enum } from 'ts-enum-util'

import { UserType } from 'src/common/enums/common.enum'
import { BaseEntity } from '../../base/base.entity'

@Entity('sys_user')
export class UserEntity extends BaseEntity {
  @Exclude({ toPlainOnly: true }) // 输出屏蔽密码
  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    comment: '用户登录密码',
  })
  public password: string

  @Exclude({ toPlainOnly: true }) // 输出屏蔽盐
  @Column({ type: 'varchar', length: 200, nullable: false, comment: '盐' })
  public salt: string

  @ApiProperty({ type: String, description: '用户登录账号' })
  @Column({ type: 'varchar', length: 32, comment: '用户登录账号' })
  public account: string

  @ApiProperty({ type: String, description: '手机号' })
  @Column({
    type: 'varchar',
    name: 'phone_num',
    default: '',
    length: 20,
    comment: '用户手机号码',
  })
  public phoneNum: string

  @ApiProperty({ type: String, description: '邮箱' })
  @Column({ type: 'varchar', comment: '邮箱地址', default: '' })
  public email: string

  @ApiProperty({ type: String, description: '头像url' })
  @Column({ type: 'varchar', comment: '头像地址' })
  public avatar: string

  @ApiProperty({
    type: Number,
    description: '帐号类型：0-超管， 1-普通用户',
    enum: $enum(UserType).getValues(),
  })
  @Column({
    type: 'tinyint',
    default: UserType.ORDINARY_USER,
    comment: '帐号类型：0-超管， 1-普通用户',
  })
  public type: UserType
}
