import { Inject, Injectable } from '@nestjs/common'

import { UserEntity } from '@lib/entities'
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
