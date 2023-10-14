import { Column, Entity } from 'typeorm';
import { TestDataApi } from './interface';
import { getTestEntityColumns, getTestEntityName } from './constant';
import { BaseEntity } from '../../base/base.entity';

const { testName, describe } = getTestEntityColumns();
@Entity(getTestEntityName())
export class TestEntity extends BaseEntity implements TestDataApi {
  @Column(testName)
  testName: string;

  @Column(describe)
  describe?: string;
}
