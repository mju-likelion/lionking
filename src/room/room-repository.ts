import { ConflictException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Lounge } from 'src/lounge/lounges.entity';
import { Memo } from 'src/memo/memo.entity';
import { EntityRepository, Repository } from 'typeorm';

import { CreateRoomDto } from './dto/room-create.dto';
import { RoomQueryDto } from './dto/room-query.dto';
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

  async getLoungeId(user: User): Promise<Array<string>> {
    const loungeData = await this.createQueryBuilder('room')
      .leftJoinAndSelect('room.user', 'user.id')
      .where('room.user =  userId', { userId: user.id })
      .select(['loungeId'])
      .execute();
    return loungeData.map(lounge => lounge.loungeId);
  }

  async getUserId(userId: number) {
    const userData = await this.createQueryBuilder('room')
      .where('room.id IN (:userId)', { userId })
      .select(['userId'])
      .execute();

    return userData[0].userId;
  }
}
