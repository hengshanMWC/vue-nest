import { BaseFuncGroup, GetBaseEntityColumns, GetBaseEntityData, GetBaseEntityName, KeyType } from './interface'

export function createEntitiesFunc<K extends KeyType>(getEntityData: GetBaseEntityData<K>): BaseFuncGroup<K> {
  const getEntityName: GetBaseEntityName<K> = () => {
    return getEntityData().name
  }

  const getEntityColumns: GetBaseEntityColumns<
    K
  > = () => {
    return getEntityData().columns
  }
  return {
    getEntityName,
    getEntityColumns,
  }
}
