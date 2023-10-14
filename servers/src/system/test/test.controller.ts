import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto, FindListTestDto } from './dto/test.dto';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('getHello')
  getHello(): string {
    return this.testService.getHello();
  }

  @Post()
  create(@Body() dto: CreateTestDto) {
    return this.testService.create(dto);
  }

  @Get('list')
  findList(@Query() dto: FindListTestDto) {
    return this.testService.findList(dto);
  }
}
