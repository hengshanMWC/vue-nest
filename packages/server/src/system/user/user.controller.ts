import { Body, Controller, Get, Put, Query, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

import { ApiResult } from 'src/helpers/decorators/api-result.decorator'
import { UpdatePasswordDto, UpdateUserDto, UserInfoResultDto } from '@lib/dtos'
import { ROUTER_USER_BASE, ROUTER_USER_GROUP } from '@lib/routers'
import { ResultData } from '../../helpers/utils/result'
import { UserService } from './user.service'

@ApiTags('用户账号')
@ApiBearerAuth()
@Controller(ROUTER_USER_BASE)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(ROUTER_USER_GROUP.GET_INFO)
  @ApiOperation({ summary: '根据id查询用户信息' })
  @ApiQuery({ name: 'id', required: false })
  @ApiResult(UserInfoResultDto)
  async findOne(@Req() req, @Query('id') id?: string): Promise<ResultData> {
    return await this.userService.findOne(id || req.user.id)
  }

  @Put(ROUTER_USER_GROUP.PUT_INFO)
  @ApiOperation({ summary: '更新用户信息' })
  @ApiResult()
  async update(@Body() dto: UpdateUserDto, @Req() req): Promise<ResultData> {
    return await this.userService.update(dto, req.user)
  }

  @Put(ROUTER_USER_GROUP.PUT_PASSWORD)
  @ApiOperation({ summary: '重置用户密码' })
  @ApiResult()
  async updatePassword(
    @Body() dto: UpdatePasswordDto,
    @Req() req,
  ): Promise<ResultData> {
    return await this.userService.updatePassword(
      dto,
      req.user.id,
      false,
      req.user,
    )
  }
}
