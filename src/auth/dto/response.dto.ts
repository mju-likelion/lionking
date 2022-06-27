export class ResponseDto {
  constructor(status: string, message: string) {
    this.status = status;
    this.data = { message };
  }

  status: string;

  data: {
    message: string;
  };
}
