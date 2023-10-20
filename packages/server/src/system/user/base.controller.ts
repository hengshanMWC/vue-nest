import { Body, Controller, Post, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

import { AllowAnon } from 'src/helpers/decorators/allow-anon.decorator'
import { userRouterData } from '@vue-nest/routers'
import { CreateTokenResultDto, CreateUserDto, CreateUserResultDto, LoginUserDto } from '@vue-nest/dtos'
import { ResultData } from '../../helpers/utils/result'
import { ApiResult } from '../../helpers/decorators/api-result.decorator'

import { UserService } from './user.service'

const {
  base,
  childrenGroup,
} = userRouterData
@ApiTags('登录注册')
@Controller(base)
export class BaseController {
  constructor(private readonly userService: UserService) {}

  @Post(childrenGroup.POST_REGISTER)
  @ApiOperation({ summary: '用户注册' })
  @ApiResult(CreateUserResultDto)
  @AllowAnon()
  async create(@Body() user: CreateUserDto): Promise<ResultData> {
    return await this.userService.create(user)
  }

  @Post(childrenGroup.POST_LOGIN)
  @ApiOperation({ summary: '登录' })
  @ApiResult(CreateTokenResultDto)
  @AllowAnon()
  async login(@Body() dto: LoginUserDto): Promise<ResultData> {
    return await this.userService.login(dto.account, dto.password)
  }

  @Post(childrenGroup.POST_UPDATE_TOKEN)
  @ApiOperation({ summary: '刷新token' })
  @ApiResult(CreateTokenResultDto)
  @ApiBearerAuth()
  async updateToken(@Req() req): Promise<ResultData> {
    return await this.userService.updateToken(req.user.id)
  }
}
