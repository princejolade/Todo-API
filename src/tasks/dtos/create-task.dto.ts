import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly date?: string;

  @IsOptional()
  @IsString()
  readonly dir?: string;

  @IsOptional()
  @IsBooleanString()
  readonly completed?: boolean;

  @IsOptional()
  @IsBooleanString()
  readonly important?: boolean;
}
