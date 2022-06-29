import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { MemoService } from './memo.service';

@UseGuards(AuthGuard())
@Controller('memos')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Get()
  async testMemo() {
    return this.memoService.testMemo();
  }
}
