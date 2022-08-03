import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from 'src/auth/get-user.decorator';
// import { ResponseDto } from 'src/auth/dto/response.dto';
// import { User } from 'src/auth/user.entity';

import { LoungeCredentialDto } from './dto/lounge-credential.dto';
import { ResponseUrlDto } from './dto/response-url.dto';
// import { GetUserId } from './get-user.decorator';
import { LoungeService } from './lounge.service';
// import { Lounge } from './lounges.entity';

@UseGuards(AuthGuard())
@Controller('api/lounges')
export class LoungeController {
  constructor(private readonly loungeService: LoungeService) {}

  // // 내 라운지 정보 전체
  // @Get()
  // async Lounges(@GetUserId() userId: User, @Query('page') page: string): Promise<ResponseDto> {
  //   return this.loungeService.Lounges(page, userId);
  // }

  // // 라운지 정보 단일
  // @Get('/:id')
  // async findLounge(@Param('id') id: string): Promise<Lounge[]> {
  //   return this.loungeService.findLounge(id);
  // }

  // 라운지 생성
  @Post()
  async createLounge(
    @Body(ValidationPipe) loungeCredentialDto: LoungeCredentialDto,
    @GetUserId() userId: number,
  ): Promise<ResponseUrlDto> {
    return this.loungeService.createLounge(loungeCredentialDto, userId);
  }
}
