import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user-repository';
import { CreateRoomDto } from 'src/room/dto/room-create.dto';
import { RoomRepository } from 'src/room/room-repository';
// import { User } from 'src/auth/user.entity';

import { LoungeCredentialDto } from './dto/lounge-credential.dto';
import { ResponseUrlDto } from './dto/response-url.dto';
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

  // // 내 라운지 정보 전체
  // async Lounges(page: string, userId: User) {
  //   const loungeName = await this.loungeRepository.findAllLounges(page, userId);
  //   return new ResponseDto(`${loungeName}`);
  // }

  // // 라운지 정보 단일
  // async findLounge(id: string) {
  //   const userName = await this.loungeRepository.findLounge(id);
  //   return userName;
  // }

  // 라운지 생성
  async createLounge(loungeCredentialDto: LoungeCredentialDto, userId: number) {
    const userData = await this.userRepository.findOne(userId);
    // 라운지 생성
    const loungeData = await this.loungeRepository.createLounge(loungeCredentialDto);
    // 방장 룸 생성
    await this.roomRepository.adminCreateRoom(new CreateRoomDto(userData, loungeData, true));
    return new ResponseUrlDto(`https://liontown.city/lounges/${loungeData.id}`);
  }

  // 라운지 탈퇴
  async deleteLounge() {
    return 'testLounge';
  }
}
