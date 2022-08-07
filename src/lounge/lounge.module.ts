import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from 'src/auth/user-repository';
import { RoomRepository } from 'src/room/room-repository';

import { LoungeRepository } from './lounge-repository';
import { LoungeController } from './lounge.controller';
import { LoungeService } from './lounge.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([LoungeRepository, RoomRepository, UserRepository]),
  ],
  controllers: [LoungeController],
  providers: [LoungeService],
})
export class LoungeModule {}
