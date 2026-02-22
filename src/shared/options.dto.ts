import { IsOptional, IsInt, Min, IsString } from 'class-validator';

export class Options {
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
