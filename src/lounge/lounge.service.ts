import { Injectable } from '@nestjs/common';

@Injectable()
export class LoungeService {
  // test
  async testLounge() {
    return 'testLounge';
  }

  // 라운지 정보 전체
  async Lounges() {
    return 'testLounge';
  }

  // 라운지 정보 단일
  async Lounge() {
    return 'testLounge';
  }

  // 라운지 생성
  async createLounge() {
    return 'testLounge';
  }

  // 라운지 탈퇴
  async deleteLounge() {
    return 'testLounge';
  }
}
