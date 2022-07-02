import { ResponseDto } from './response.dto';

export class SignInResponseDto extends ResponseDto {
  constructor(status: string, message: string, token: string) {
    super(status, message);
    this.token = token;
  }

  token: string;
}
