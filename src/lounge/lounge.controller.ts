import { Body, Controller, Delete, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResponseDto } from 'src/auth/dto/response.dto';

import { LoungeCredentialDto } from './dto/lounge-credential.dto';
import { LoungeService } from './lounge.service';

@UseGuards(AuthGuard())
@Controller('api/lounge')
export class LoungeController {
  constructor(private readonly loungeService: LoungeService) {}

  // 라운지 테스트
  @Get()
  async testLounge() {
    return this.loungeService.testLounge();
  }

  // 라운지 정보 전체
  @Get()
  async Lounges() {
    return this.loungeService.Lounges();
  }

  // 라운지 정보 단일
  @Get('/:id')
  async Lounge() {
    return this.loungeService.Lounge();
  }

  // 라운지 생성
  @Post()
  async createLounge(
    @Body(ValidationPipe) loungeCredentialDto: LoungeCredentialDto,
  ): Promise<ResponseDto> {
    return this.loungeService.createLounge(loungeCredentialDto);
  }

  // 라운지 삭제
  @Delete()
  async deleteLounge() {
    return this.loungeService.deleteLounge();
  }
}
