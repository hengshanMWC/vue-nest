import { Module } from '@nestjs/common';
import { TestModule } from './system/test/test.module';
import { StaticModule } from './system/static/static.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config';

@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true,
    }),
    // 业务
    TestModule,
    StaticModule,
  ],
})
export class AppModule {}
