import { Column, Entity } from 'typeorm'
import { Exclude } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from '../../base/entity'
import type { OssStructureApi } from './interface'
import { getOssEntityColumns, getOssEntityName } from './constant'

const { userId, userAccount, url, size, type, describes, location } =
  getOssEntityColumns()
@Entity(getOssEntityName())
export class OssEntity extends BaseEntity implements OssStructureApi {
  @ApiProperty({ description: userId.comment })
  @Column(userId)
  public userId: string

  @ApiProperty({ description: userAccount.comment })
  @Column(userAccount)
  public userAccount: string

  @ApiProperty({ description: url.comment })
  @Column(url)
  public url: string

  @ApiProperty({ description: size.comment })
  @Column(size)
  public size: number

  @ApiProperty({ description: type.comment })
  @Column(type)
  public type: string

  @ApiProperty({ description: describes.comment })
  @Column(describes)
  public describes?: string

  @Exclude({ toPlainOnly: true }) // 输出屏蔽
  @Column(location)
  public location: string
}
