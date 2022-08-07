import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { MemoRepository } from './memo-repository';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([MemoRepository])],
  controllers: [MemoController],
  providers: [MemoService],
})
export class MemoModule {}
