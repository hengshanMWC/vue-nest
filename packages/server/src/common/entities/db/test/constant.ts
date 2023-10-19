import {
  GetBaseEntityColumns,
  GetBaseEntityData,
  GetBaseEntityName,
} from '../../interface'
import { TestDataKeyList } from './interface'

export const getTestEntityData: GetBaseEntityData<TestDataKeyList> = () => {
  return {
    name: 'test',
    columns: {
      testName: {
        name: 'test_name',
        comment: '测试名称',
        length: 50,
        nullable: true,
      },
      describe: {
        name: 'describe',
        comment: '描述',
        length: 200,
        nullable: false,
      },
    },
  }
}

export const getTestEntityName: GetBaseEntityName<TestDataKeyList> = () => {
  return getTestEntityData().name
}

export const getTestEntityColumns: GetBaseEntityColumns<
  TestDataKeyList
> = () => {
  return getTestEntityData().columns
}
