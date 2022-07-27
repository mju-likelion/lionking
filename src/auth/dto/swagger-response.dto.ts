export class SwaggerResponseDto {
  constructor(status: number, message: string) {
    this.status = status;
    this.description = '성공여부';
    this.schema = { example: { data: { message } } };
  }

  status: number;

  description: string;

  schema: {
    example: { data: { message: string } };
  };
}
