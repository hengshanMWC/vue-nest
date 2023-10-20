import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OssEntity } from '@vue-nest/entities'
import { OssController } from './oss.controller'
import { OssService } from './oss.service'

@Module({
  imports: [TypeOrmModule.forFeature([OssEntity])],
  providers: [OssService],
  controllers: [OssController],
})
export class OssModule {}
