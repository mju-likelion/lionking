import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { RoomRepository } from './room-repository';
import { RoomController } from './room.controller';
import { Room } from './room.entity';
import { RoomService } from './room.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Room, RoomRepository])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
