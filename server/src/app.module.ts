import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestLogsModule } from '@abmao/nest-logs';
@Module({
  imports: [NestLogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
