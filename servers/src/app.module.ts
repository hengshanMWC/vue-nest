import { Module } from '@nestjs/common'
import { UserModule } from './system/user/user.module'
import { AuthModule } from './system/auth/auth.module'
import { StaticModule } from './system/static/static.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from './config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true
    }),
    // 数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          // 可能不再支持这种方式，entities 将改成接收 实体类的引用
          //
          // entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          autoLoadEntities: true,
          keepConnectionAlive: true,
          ...config.get('db.mysql')
          // cache: {
          //   type: 'ioredis',
          //   ...config.get('redis'),
          //   alwaysEnabled: true,
          //   duration: 3 * 1000, // 缓存3s
          // },
        } as TypeOrmModuleOptions
      }
    }),
    // 业务支持
    StaticModule,
    UserModule,
    AuthModule
  ]
})
export class AppModule {}
