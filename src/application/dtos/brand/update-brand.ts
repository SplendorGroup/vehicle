import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class UpdateBrandDTO {
  @IsString()
  @Length(2, 50)
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}

export class UpdateBrandParamsDTO {
  @IsUUID()
  id: string;
}
