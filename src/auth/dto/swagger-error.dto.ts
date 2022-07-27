export class SwaggerErrorDto {
  constructor(status: number, error: string) {
    this.status = status;
    this.description = '실패여부';
    this.schema = { example: { data: { error } } };
  }

  status: number;

  description: string;

  schema: {
    example: { data: { error: string } };
  };
}
