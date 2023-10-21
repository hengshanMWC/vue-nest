import { Body, Controller, Post, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

import { AllowAnon } from 'src/helpers/decorators/allow-anon.decorator'
import { ROUTER_USER_BASE, ROUTER_USER_GROUP } from '@lib/routers'
import { CreateTokenResultDto, CreateUserDto, CreateUserResultDto, LoginUserDto } from '@lib/dtos'
import { ResultData } from '../../helpers/utils/result'
import { ApiResult } from '../../helpers/decorators/api-result.decorator'

import { UserService } from './user.service'

@ApiTags('登录注册')
@Controller(ROUTER_USER_BASE)
export class BaseController {
  constructor(private readonly userService: UserService) {}

  @Post(ROUTER_USER_GROUP.POST_REGISTER)
  @ApiOperation({ summary: '用户注册' })
  @ApiResult(CreateUserResultDto)
  @AllowAnon()
  async create(@Body() user: CreateUserDto): Promise<ResultData> {
    return await this.userService.create(user)
  }

  @Post(ROUTER_USER_GROUP.POST_LOGIN)
  @ApiOperation({ summary: '登录' })
  @ApiResult(CreateTokenResultDto)
  @AllowAnon()
  async login(@Body() dto: LoginUserDto): Promise<ResultData> {
    return await this.userService.login(dto.account, dto.password)
  }

  @Post(ROUTER_USER_GROUP.POST_UPDATE_TOKEN)
  @ApiOperation({ summary: '刷新token' })
  @ApiResult(CreateTokenResultDto)
  @ApiBearerAuth()
  async updateToken(@Req() req): Promise<ResultData> {
    return await this.userService.updateToken(req.user.id)
  }
}
