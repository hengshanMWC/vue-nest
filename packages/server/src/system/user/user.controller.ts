import { Body, Controller, Get, Put, Query, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

import { ApiResult } from 'src/helpers/decorators/api-result.decorator'
import { CreateUserResultDto, UpdatePasswordDto, UpdateUserDto } from '@vue-nest/dtos'
import { userRouterData } from '@vue-nest/routers'
import { ResultData } from '../../helpers/utils/result'
import { UserService } from './user.service'

const {
  base,
  childrenGroup,
} = userRouterData
@ApiTags('用户账号')
@ApiBearerAuth()
@Controller(base)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(childrenGroup.GET_INFO)
  @ApiOperation({ summary: '根据id查询用户信息' })
  @ApiQuery({ name: 'id' })
  @ApiResult(CreateUserResultDto)
  async findOne(@Query('id') id: string, @Req() req): Promise<ResultData> {
    return await this.userService.findOne(id || req.user.id)
  }

  @Put(childrenGroup.PUT_INFO)
  @ApiOperation({ summary: '更新用户信息' })
  @ApiResult()
  async update(@Body() dto: UpdateUserDto, @Req() req): Promise<ResultData> {
    return await this.userService.update(dto, req.user)
  }

  @Put(childrenGroup.PUT_PASSWORD)
  @ApiOperation({ summary: '重置用户密码' })
  @ApiResult()
  async updatePassword(
    @Body() dto: UpdatePasswordDto,
    @Req() req,
  ): Promise<ResultData> {
    return await this.userService.updatePassword(dto, req.user.id, false, req.user)
  }
}
