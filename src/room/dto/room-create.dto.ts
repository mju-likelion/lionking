import { User } from 'src/auth/user.entity';
import { Lounge } from 'src/lounge/lounges.entity';

export class CreateRoomDto {
  user: User;

  lounge: Lounge;

  admin?: boolean;
}
