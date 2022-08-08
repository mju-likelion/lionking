import { Lounge } from '../lounges.entity';

export class LoungeRoomDto {
  constructor(userName: string[], loungeName: Lounge) {
    this.userName = userName;
    this.loungeName = loungeName;
  }

  userName: string[];

  loungeName: Lounge;
}
