import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user-repository';
import { CreateRoomDto } from 'src/room/dto/room-create.dto';
import { RoomRepository } from 'src/room/room-repository';
// import { User } from 'src/auth/user.entity';

import { LoungeCredentialDto } from './dto/lounge-credential.dto';
import { LoungeRoomDto } from './dto/lounge-room.dto';
import { ResponseUrlDto } from './dto/response-url.dto';
import { ResponseDto } from './dto/response.dto';
// import { ResponseDto } from './dto/response.dto';
import { LoungeRepository } from './lounge-repository';

@Injectable()
export class LoungeService {
  constructor(
    @InjectRepository(LoungeRepository)
    private loungeRepository: LoungeRepository,
    @InjectRepository(RoomRepository)
    private roomRepository: RoomRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {} // private roomRepository: RoomRepository,

  // 내 라운지 정보 전체
  async Lounges(userId: number, page: number) {
    const userData = await this.userRepository.findOne(userId);
    const loungeIds = await this.roomRepository.getLoungeId(userData);
    const loungeNames = await this.loungeRepository.findAllLounges(loungeIds, page);

    return loungeNames;
  }

  // 라운지 정보 단일
  async findLounge(id: string) {
    const loungeName = await this.loungeRepository.findOne(id, { select: ['name'] });
    if (!loungeName) {
      throw new HttpException({ error: { message: `${id} 해당 라운지가 없습니다` } }, 404);
    }
    const roomData = await this.loungeRepository.findLounge(id);
    return { data: new LoungeRoomDto(roomData, loungeName) };
  }

  // 라운지 생성
  async createLounge(loungeCredentialDto: LoungeCredentialDto, userId: number) {
    // 유저 정보
    const userData = await this.userRepository.findOne(userId);
    // 라운지 생성
    const loungeData = await this.loungeRepository.createLounge(loungeCredentialDto);
    // 방장 룸 생성
    await this.roomRepository.adminCreateRoom(new CreateRoomDto(userData, loungeData, true));
    return new ResponseUrlDto(`https://liontown.city/lounges/${loungeData.id}`);
  }

  async joinLounge(id: string, userId: number) {
    const userData = await this.userRepository.findOne(userId);
    const loungeData = await this.loungeRepository.findOne(id);
    const roomData = await this.roomRepository
      .createQueryBuilder('room')
      .where('room.loungeId = (:id) AND room.userId = (:userId)', { id: loungeData.id, userId })
      .execute();

    if (roomData.length) {
      const myLounge = await this.roomRepository
        .createQueryBuilder('room')
        .leftJoinAndSelect('room.user', 'user.id')
        .where('room.user =  userId', { userId })
        .select(['room.id', 'name'])
        .execute();
      throw new HttpException({ data: myLounge }, 200);
    }
    await this.roomRepository.userCreateRoom(new CreateRoomDto(userData, loungeData));
    return new ResponseDto('라운지가입에 성공하였습니다.');
  }
}
