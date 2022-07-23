import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomService {
  async testUserLounge() {
    return 'testUserLounge';
  }
}
