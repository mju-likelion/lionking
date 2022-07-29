import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { LoungeRepository } from './lounge-repository';
import { LoungeController } from './lounge.controller';
import { LoungeService } from './lounge.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([LoungeRepository])],
  controllers: [LoungeController],
  providers: [LoungeService],
})
export class LoungeModule {}
