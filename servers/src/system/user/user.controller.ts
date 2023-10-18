import { Body, Controller, Get, Param, Put, Query, Req } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger'

import { UserService } from './user.service'

import { ResultData } from '../../common/utils/result'
import { ApiResult } from 'src/common/decorators/api-result.decorator'
import { UserEntity } from 'src/common/entities/db/user/user.entity'
import { UpdateUserDto } from './dto/update-user.dto'

@ApiTags('用户账号')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('one/info')
  @ApiOperation({ summary: '根据id查询用户信息' })
  @ApiQuery({ name: 'id' })
  @ApiResult(UserEntity)
  async findOne(@Query('id') id: string, @Req() req): Promise<ResultData> {
    return await this.userService.findOne(id || req.user.id)
  }

  @Put()
  @ApiOperation({ summary: '更新用户信息' })
  @ApiResult()
  async update(@Body() dto: UpdateUserDto, @Req() req): Promise<ResultData> {
    return await this.userService.update(dto, req.user)
  }

  @Put('/password/reset/:userId')
  @ApiOperation({ summary: '重置用户密码' })
  @ApiResult()
  async resetPassword(@Param('userId') userId: string, @Req() req): Promise<ResultData> {
    return await this.userService.updatePassword(userId, '', true, req.user)
  }
}
