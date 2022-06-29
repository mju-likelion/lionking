import { Injectable } from '@nestjs/common';

@Injectable()
export class UserLoungeService {
  async testUserLounge() {
    return 'testUserLounge';
  }
}
