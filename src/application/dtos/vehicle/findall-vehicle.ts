import {
  IsBooleanString,
  IsDateString,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class FindAllVehicleDTO {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  brand: string;

  @IsString()
  @IsOptional()
  model: string;

  @IsString()
  @IsOptional()
  color: string;

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

