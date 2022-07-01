import { Injectable } from '@nestjs/common';

@Injectable()
export class LoungeService {
  lounge: any;

  getAll() {
    return this.lounge;
  }
}
