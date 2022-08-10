export class SwaggerOperationDto {
  constructor(summary: string, description: string) {
    this.summary = summary;
    this.description = description;
  }

  description: string;

  summary: string;
}
