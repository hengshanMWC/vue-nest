import { join } from 'node:path'
import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'
import { StaticService } from './static.service'

@Controller()
export class StaticController {
  constructor(private readonly appService: StaticService) {}

  @Get()
  views(@Res() res: Response) {
    res.sendFile(join(__dirname, '../views', 'index.html'))
  }
}
