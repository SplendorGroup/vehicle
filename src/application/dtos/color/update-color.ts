import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class UpdateColorDTO {
  @IsString()
  @Length(2, 50)
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}

export class UpdateColorParamsDTO {
  @IsUUID()
  id: string;
}
