import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { TestDataApi } from '../../../common/entities/db/test/interface';
import { getTestEntityColumns } from 'src/common/entities/db/test/constant';
import { ReqListQuery } from 'src/common/dtos/req-list-query';

const { testName, describe } = getTestEntityColumns();

export class CreateTestDto implements TestDataApi {
  @IsNotEmpty({ message: testName.name + ' 不能为空' })
  @MaxLength(testName.length, {
    message: `${testName.comment}最多${testName.length}个字符`,
  })
  testName: string;

  @IsOptional()
  @MaxLength(describe.length, {
    message: `${describe.comment}最多${describe.length}个字符`,
  })
  describe?: string;
}

export class FindListTestDto extends ReqListQuery {}
