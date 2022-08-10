import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserId } from 'src/auth/get-user.decorator';

import { LoungeCredentialDto } from './dto/lounge-credential.dto';
import { LoungeRoomDto } from './dto/lounge-room.dto';
import { ResponseUrlDto } from './dto/response-url.dto';
import { SwaggerErrorDto } from './dto/swagger-error.dto';
import { SwaggerOperationDto } from './dto/swagger-operation.dto';
import { SwaggerResponseDto } from './dto/swagger-response.dto';
import { LoungeService } from './lounge.service';
import { Lounge } from './lounges.entity';

@ApiTags('Lounge')
@UseGuards(AuthGuard())
@Controller('api/lounges')
export class LoungeController {
  constructor(private readonly loungeService: LoungeService) {}

  // 내 라운지 정보 전체
  @ApiOperation(
    new SwaggerOperationDto('내 라운지 정보 전체 API', '내가 소속된 라운지 리스트를 보여줍니다.'),
  )
  @ApiOkResponse({
    description: '내가 소속된 라운지 리스트 응답',
    schema: {
      example: {
        data: {
          id: 'ABCDEF',
          name: 'lounge1',
        },
      },
    },
  })
  @ApiQuery({ name: 'page', required: false })
  @Get()
  async Lounges(
    @GetUserId() userId: number,
    @Query('page') page: number,
  ): Promise<{ data: Lounge[] }> {
    return this.loungeService.Lounges(userId, page);
  }

  // 라운지 정보 단일
  @ApiOperation(new SwaggerOperationDto('라운지 정보 단일 API', '선택한 라운지 정보를 보여줍니다.'))
  @ApiOkResponse({
    description: '소속된 라운지 정보 응답',
    schema: {
      example: {
        data: {
          roomData: [
            {
              roomId: 1,
              userName: '닉네임1',
            },
            {
              roomId: 7,
              userName: '닉네임2',
            },
            {
              roomId: 8,
              userName: '닉네임3',
            },
          ],
          loungeName: {
            name: '라운지명',
          },
        },
      },
    },
  })
  @ApiResponse(new SwaggerErrorDto(404, ' {id} 해당 라운지가 없습니다'))
  @Get('/:id')
  async findLounge(@Param('id') id: string): Promise<{ data: LoungeRoomDto }> {
    return this.loungeService.findLounge(id);
  }

  // 라운지 생성
  @ApiOperation(new SwaggerOperationDto('라운지 생성 API', '라운지와 룸을 생성합니다.'))
  @ApiOkResponse({
    description: '라운지 생성, 방장의 룸 생성',
    schema: {
      example: {
        data: {
          // eslint-disable-next-line no-template-curly-in-string
          loungeId: 'https://liontown.city/lounges/${loungeData.id}',
        },
      },
    },
  })
  @ApiResponse(new SwaggerErrorDto(510, '알 수 없는 에러가 발생하였습니다 재시도해주세요.'))
  @ApiResponse(new SwaggerErrorDto(409, '이미 있는 라운지 입니다.'))
  @ApiResponse(new SwaggerErrorDto(500, '의도치 않은 에러가 발생하였습니다.'))
  @Post()
  async createLounge(
    @Body(ValidationPipe) loungeCredentialDto: LoungeCredentialDto,
    @GetUserId() userId: number,
  ): Promise<ResponseUrlDto> {
    return this.loungeService.createLounge(loungeCredentialDto, userId);
  }

  @ApiOperation(new SwaggerOperationDto('라운지 가입 API', '라운지에 가입합니다.'))
  @ApiOkResponse({
    description: '소속된 라운지 정보 응답',
    schema: {
      example: {
        data: {
          roomData: [
            {
              roomId: 1,
              userName: '닉네임1',
            },
            {
              roomId: 7,
              userName: '닉네임2',
            },
            {
              roomId: 8,
              userName: '닉네임3',
            },
          ],
          loungeName: {
            name: '라운지명',
          },
        },
      },
    },
  })
  @ApiResponse(new SwaggerResponseDto(201, '라운지가입에 성공하였습니다.'))
  @ApiResponse(new SwaggerResponseDto(200, '라운지가입에 성공하였습니다.'))
  @Post('/:id')
  async joinLounge(@Param('id') id: string, @GetUserId() userId: number) {
    return this.loungeService.joinLounge(id, userId);
  }
}
