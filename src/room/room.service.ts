import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/room/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async testUserLounge() {
    return 'testUserLounge';
  }

  async getRoom(id: number): Promise<Room> {
    return this.roomRepository.findOne(id, { relations: ['user', 'memos'] });
  }
}
