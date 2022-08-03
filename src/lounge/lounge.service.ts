import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {} // private roomRepository: RoomRepository,

  // test
  async testLounge() {
    return 'testLounge';
  }

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
  async createLounge(loungeCredentialDto: LoungeCredentialDto) {
    // 라운지 생성
    const url = await this.loungeRepository.createLounge(loungeCredentialDto);
    // 방장 룸 생성
    // this.roomRepository.createRoom(roomCredentialDto);
    return new ResponseUrlDto(`liontown.city/lounges/${url}`);
  }

  // 라운지 탈퇴
  async deleteLounge() {
    return 'testLounge';
  }
}
