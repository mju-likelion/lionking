import { Lounge } from '../lounges.entity';

export class LoungeRoomDto {
  constructor(roomData: object, loungeName: Lounge) {
    this.roomData = roomData;
    this.loungeName = loungeName;
  }

  roomData: object;

  loungeName: Lounge;
}
