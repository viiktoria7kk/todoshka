import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  TodoHi(): string {
    return 'ToDo List!';
  }
}
