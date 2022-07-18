import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RoomService } from './room.service';

@UseGuards(AuthGuard())
@Controller('api/user-lounges')
export class RoomController {
  constructor(private readonly userLoungeService: RoomService) {}

  @Get()
  async testUserLounge() {
    return this.userLoungeService.testUserLounge();
  }
}
