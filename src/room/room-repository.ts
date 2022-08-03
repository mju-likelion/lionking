import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { CreateRoomDto } from './dto/room-create.dto';
import { Room } from './room.entity';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
  async userCreateRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const { user, lounge } = createRoomDto;

    const room = this.create({
      user,
      lounge,
    });

    await this.save(room);
    return room;
  }

  async adminCreateRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const { user, lounge, admin } = createRoomDto;

    if (!admin) {
      throw new ConflictException('어드민이 아닙니다.');
    }

    const room = this.create({
      user,
      lounge,
      admin,
    });

    await this.save(room);
    return room;
  }
}
