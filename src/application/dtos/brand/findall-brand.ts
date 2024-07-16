import {
  IsBooleanString,
  IsDateString,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class FindAllBrandDTO {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsBooleanString()
  @IsOptional()
  available: boolean;

  @IsNumberString()
  @IsOptional()
  page: number;

  @IsDateString()
  @IsOptional()
  start_date: string;

  @IsDateString()
  @IsOptional()
  end_date: string;
}
