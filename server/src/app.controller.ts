import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { NestLogger } from '@abmao/nest-logs';

@NestLogger()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
