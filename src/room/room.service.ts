import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/room/room.entity';

import { RoomQueryDto } from './dto/room-query.dto';
import { RoomRepository } from './room-repository';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomRepository)
    private readonly roomRepository: RoomRepository,
  ) {}

  async getRoom(id: number): Promise<{ data: any }> {
    const room = await this.roomRepository.findOne(id, { relations: ['user', 'memos'] });
    return { data: room };
  }

  async getRoomMemos(id: number, roomQuery: RoomQueryDto): Promise<Room[]> {
    const rooms = await this.roomRepository.getRoomMemos(id, roomQuery);
    return rooms;
  }
}
