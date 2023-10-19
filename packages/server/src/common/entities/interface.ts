import { ColumnOptions } from 'typeorm'

type KeyType = string | number | symbol
interface BaseEntityData<K extends KeyType> {
  name?: string
  columns: Record<K, ColumnOptions & { length?: number }>
}
// 每个 entities 都要实现这些接口
type GetBaseEntityData<K extends KeyType> = () => BaseEntityData<K>
type GetBaseEntityName<K extends KeyType> =
  () => BaseEntityData<K>['name']
type GetBaseEntityColumns<K extends KeyType> =
  () => BaseEntityData<K>['columns']
interface BaseFuncGroup<K extends KeyType> {
  getEntityName: GetBaseEntityName<K>
  getEntityColumns: GetBaseEntityColumns<K>
}

export {
  BaseFuncGroup,
  GetBaseEntityName,
  KeyType,
  GetBaseEntityData,
  GetBaseEntityColumns,
}
