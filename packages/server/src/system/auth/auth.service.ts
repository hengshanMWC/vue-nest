import { Inject, Injectable } from '@nestjs/common'

import { UserEntity } from 'src/common/entities/db/user/user.entity'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async validateUser(payload: { id: string }): Promise<UserEntity> {
    return await this.userService.findOneById(payload.id)
  }
}
