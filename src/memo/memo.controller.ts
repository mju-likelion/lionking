import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserId } from 'src/auth/get-user.decorator';

import { MemoUpdateDto } from './dto/memo-update.dto';
import { SwaggerErrorDto } from './dto/swagger-error.dto';
import { SwaggerOperationDto } from './dto/swagger-operation.dto';
import { SwaggerResponseDto } from './dto/swagger-response.dto';
import { Memo } from './memo.entity';
import { MemoService } from './memo.service';

@UseGuards(AuthGuard())
@ApiTags('Memos')
@Controller('api/memos')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @ApiOperation(new SwaggerOperationDto('방명록 불러오기 API', '특정 방명록을 불러옵니다.'))
  @ApiResponse(new SwaggerErrorDto(404, '해당 메모가 없습니다.'))
  @ApiOkResponse({
    description: '방명록 불러오기',
    schema: {
      example: {
        data: {
          id: 1,
          title: 'hi',
          content: 'asdfasdf',
        },
      },
    },
  })
  @Get('/:id')
  async getMemo(@Param('id') id: number): Promise<{ data: Memo }> {
    return this.memoService.getMemo(id);
  }

  @ApiOperation(new SwaggerOperationDto('방명록 삭제 API', '작성한 방명록을 삭제합니다.'))
  @ApiResponse(new SwaggerResponseDto(201, '메모를 삭제하였습니다.'))
  @ApiResponse(new SwaggerErrorDto(403, '권한이 없습니다.'))
  @ApiResponse(new SwaggerErrorDto(404, '해당 메모가 없습니다.'))
  @Delete('/:id')
  async deleteMemo(@Param('id') id: number, @GetUserId() userId: number) {
    return this.memoService.deleteMemo(id, userId);
  }

  @ApiOperation(new SwaggerOperationDto('방명록 수정 API', '작성한 방명록의 내용을 수정합니다.'))
  @ApiResponse(new SwaggerErrorDto(404, '해당 메모가 없습니다..'))
  @ApiResponse(new SwaggerErrorDto(403, '권한이 없습니다.'))
  @ApiOkResponse({
    description: '방명록 수정',
    schema: {
      example: {
        data: {
          id: 1,
          title: 'hi',
          content: 'asdfasdf',
        },
      },
    },
  })
  @ApiBody({ type: MemoUpdateDto, required: false })
  @Put('/:id')
  async updateMemo(
    @Param('id') id: number,
    @GetUserId() userId: number,
    @Body(ValidationPipe) memoUpdateDto: MemoUpdateDto,
  ) {
    return this.memoService.updateMemo(id, userId, memoUpdateDto);
  }
}
