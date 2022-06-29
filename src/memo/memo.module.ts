import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';

@Module({
  imports: [AuthModule],
  controllers: [MemoController],
  providers: [MemoService],
})
export class MemoModule {}
