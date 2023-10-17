import { Injectable } from '@nestjs/common'
import { CreateTestDto, FindListTestDto } from './dto/test.dto'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { EntityManager, Repository } from 'typeorm'
import { TestEntity } from '../../common/entities/db/test/test.enity'
import { ResultData } from 'src/common/utils/result'
import { AppHttpCode } from 'src/common/enums/code.enum'
import { plainToInstance } from 'class-transformer'
import { getTestEntityColumns } from 'src/common/entities/db/test/constant'
import { getPageSkipQuantity } from 'src/common/utils/maths'

@Injectable()
export class TestService {
	@InjectRepository(TestEntity)
	private readonly testRepo: Repository<TestEntity>
	@InjectEntityManager()
	private readonly EntityManager: EntityManager
	getHello(): string {
		return 'Hello World!'
	}

	async create(dto: CreateTestDto) {
		const existing = await this.testRepo.findOne({
			where: dto
		})
		if (existing)
			return ResultData.fail(
				AppHttpCode.POST_REPEAT,
				`当前${getTestEntityColumns().testName.comment}，请修改后重新创建`
			)
		const test = plainToInstance(TestEntity, dto)
		const res = await this.EntityManager.transaction(async (transactionalEntityManager) => {
			return await transactionalEntityManager.save<TestEntity>(test)
		})
		if (!res) ResultData.fail(AppHttpCode.SERVICE_ERROR, '创建失败，请稍后重试')
		return ResultData.ok(res)
	}

	async findList(dto: FindListTestDto): Promise<ResultData> {
		const result = await this.testRepo.find({
			skip: getPageSkipQuantity(dto.page, dto.size)
		})
		return ResultData.ok(result)
	}
}
