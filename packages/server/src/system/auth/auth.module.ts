import { Module, forwardRef } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { UserModule } from '../user/user.module'

import { AuthService } from './auth.service'
import { AuthStrategy } from './auth.strategy'

@Module({
  imports: [
    forwardRef(() => UserModule), // 模块间循环依赖处理
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService, AuthStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
