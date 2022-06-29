import { Injectable } from '@nestjs/common';

@Injectable()
export class MemoService {
  async testMemo() {
    return 'testMemo';
  }
}
