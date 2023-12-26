import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import type { BaseDataApi } from './interface'
import { getBaseEntityColumns } from './constant'

const { isDeleted, createdBy, updatedBy, createdAt, updatedAt } =
  getBaseEntityColumns()
/**
 * base entity class with common fields
 */
export abstract class BaseEntity implements BaseDataApi {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string

  @Column(isDeleted)
  isDeleted!: boolean

  @Column(createdBy)
  createdBy: string

  @Column(updatedBy)
  updatedBy: string

  @CreateDateColumn(createdAt)
  createdAt!: Date

  @UpdateDateColumn(updatedAt)
  updatedAt?: Date
}
