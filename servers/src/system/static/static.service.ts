import { Injectable } from '@nestjs/common';

@Injectable()
export class StaticService {
  getHello(): string {
    return 'Hello World!';
  }
}
