import { Column, PrimaryColumn } from 'typeorm'
import type { BaseDataApi } from '@vue-nest/store'
import { getBaseEntityColumns } from './constant'

const { id, isDeleted, createdBy, updatedBy, createdAt, updatedAt }
  = getBaseEntityColumns()
/**
 * base entity class with common fields
 */
export abstract class BaseEntity implements BaseDataApi {
  @PrimaryColumn(id.type)
  id!: string

  @Column(isDeleted)
  isDeleted!: boolean

  @Column(createdBy)
  createdBy!: string

  @Column(updatedBy)
  updatedBy!: string

  @Column(createdAt)
  createdAt!: Date

  @Column(updatedAt)
  updatedAt?: Date
}
