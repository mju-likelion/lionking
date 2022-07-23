import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RoomService } from './room.service';

@Controller('api/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async testUserLounge() {
    return this.roomService.testUserLounge();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getRoom(@Param() params) {
    return this.roomService.getRoom(+params.id);
  }
}
