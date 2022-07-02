export class ResponseDto {
  constructor(message: string) {
    this.data = { message };
  }

  data: {
    message: string;
  };
}
