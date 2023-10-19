import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { TestEntity } from 'src/common/entities/db/test/test.enity'
import { TestController } from './test.controller'
import { TestService } from './test.service'

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity])],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
