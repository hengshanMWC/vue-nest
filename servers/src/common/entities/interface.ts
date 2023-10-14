import { ColumnOptions } from 'typeorm';

export type KeyType = string | number | symbol;
export interface BaseEntityData<K extends KeyType> {
  name?: string;
  columns: Record<K, ColumnOptions & { length?: number }>;
}
// 每个 entities 都要实现这些接口
export type GetBaseEntityData<K extends KeyType> = () => BaseEntityData<K>;
export type GetBaseEntityName<K extends KeyType> =
  () => BaseEntityData<K>['name'];
export type GetBaseEntityColumns<K extends KeyType> =
  () => BaseEntityData<K>['columns'];
