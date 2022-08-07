import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from 'src/auth/get-user.decorator';

import { MemoUpdateDto } from './dto/memo-update.dto';
import { Memo } from './memo.entity';
import { MemoService } from './memo.service';

@UseGuards(AuthGuard())
@Controller('api/memos')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Get('/:id')
  async getMemo(@Param('id') id: number): Promise<{ data: Memo }> {
    return this.memoService.getMemo(id);
  }

  @Delete('/:id')
  async deleteMemo(@Param('id') id: number, @GetUserId() userId: number) {
    return this.memoService.deleteMemo(id, userId);
  }

  @Put('/:id')
  async updateMemo(
    @Param('id') id: number,
    @GetUserId() userId: number,
    @Body() memoUpdateDto: MemoUpdateDto,
  ) {
    return this.memoService.updateMemo(id, userId, memoUpdateDto);
  }
}
