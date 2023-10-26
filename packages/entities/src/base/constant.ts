import type { GetBaseEntityColumns, GetBaseEntityData } from '../interface'
import type { BaseDataKeyList } from './interface'

export const getBseEntityData: GetBaseEntityData<BaseDataKeyList> = () => {
  return {
    columns: {
      id: {
        type: 'bigint',
      },
      isDeleted: {
        name: 'is_deleted',
        comment: 'wether it is deleted(0: no, 1: yes)',
        default: () => false,
      },
      createdBy: {
        type: 'bigint',
        nullable: true,
        name: 'created_by',
        comment: 'user ID of creator',
      },
      updatedBy: {
        type: 'bigint',
        nullable: true,
        name: 'updated_by',
        comment: 'ID of use who last updated id',
      },
      createdAt: {
        type: 'timestamp',
        name: 'created_at',
        comment: 'created timer',
      },
      updatedAt: {
        type: 'timestamp',
        name: 'updated_at',
        nullable: true,
        comment: 'updated time',
      },
    },
  }
}

export const getBaseEntityColumns: GetBaseEntityColumns<
  BaseDataKeyList
> = () => {
  return getBseEntityData().columns
}
