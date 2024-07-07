import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class CreateColorDTO {
  @IsString()
  @Length(2, 50)
  name: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
