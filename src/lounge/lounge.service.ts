import { Injectable } from '@nestjs/common';

@Injectable()
export class LoungeService {
  async testLounge() {
    return 'testLounge';
  }
}
