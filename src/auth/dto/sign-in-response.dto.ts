import { ResponseDto } from './response.dto';

export class SignInResponseDto extends ResponseDto {
  constructor(message: string, token: string) {
    super(message);
    this.token = token;
  }

  token: string;
}
