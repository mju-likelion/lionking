import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { MemoController } from './memo.controller';
import { Memo } from './memo.entity';
import { MemoService } from './memo.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Memo])],
  controllers: [MemoController],
  providers: [MemoService],
})
export class MemoModule {}
