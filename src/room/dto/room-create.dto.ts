import { User } from 'src/auth/user.entity';
import { Lounge } from 'src/lounge/lounges.entity';

export class CreateRoomDto {
  constructor(user: User, lounge: Lounge, admin?: boolean) {
    this.user = user;
    this.lounge = lounge;
    this.admin = admin;
  }

  user: User;

  lounge: Lounge;

  admin?: boolean;
}
