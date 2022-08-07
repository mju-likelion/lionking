import { Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { MemoService } from './memo.service';

@UseGuards(AuthGuard())
@Controller('api/memos')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Get('/:id')
  async getMemo() {
    return this.memoService.testMemo();
  }

  @Delete('/:id')
  async deleteMemo() {
    return this.memoService.deleteMemo();
  }

  @Put('/:id')
  async updateMemo() {
    return this.memoService.updateMemo();
  }
}
