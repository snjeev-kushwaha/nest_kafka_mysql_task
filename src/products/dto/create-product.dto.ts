export class CreateProductDto {
  readonly name: string;
  readonly description?: string;
  readonly budget: number;
  readonly status: string;
}
