import { Controller, Get, Res } from '@nestjs/common';
import { StaticService } from './static.service';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class StaticController {
  constructor(private readonly appService: StaticService) {}

  @Get()
  views(@Res() res: Response) {
    res.sendFile(join(__dirname, '../views', 'index.html'));
  }
}
