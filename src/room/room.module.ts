import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [AuthModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
