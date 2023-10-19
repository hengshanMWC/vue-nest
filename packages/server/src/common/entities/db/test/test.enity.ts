import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../../base/base.entity'
import { TestDataApi } from './interface'
import { getTestEntityColumns, getTestEntityName } from './constant'

const { testName, describe } = getTestEntityColumns()
@Entity(getTestEntityName())
export class TestEntity extends BaseEntity implements TestDataApi {
  @Column(testName)
  testName: string

  @Column(describe)
  describe?: string
}
