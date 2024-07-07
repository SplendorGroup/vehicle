import { IsUniqueColorIdArray } from '@/infraestructure/validations/is-unique-color-id-array';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, IsUrl, Length, Min } from 'class-validator';

export class VehicleColor {
  @IsUUID()
  @IsNotEmpty()
  color_id: string;

  @IsUrl()
  @IsOptional()
  image: string;

  @IsBoolean()
  @IsOptional()
  default: boolean;
}

export class CreateVehicleDTO {
  @IsUUID()
  @IsNotEmpty()
  brand_id: string;

  @IsString()
  @Length(2, 50)
  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  year: number;

  @Min(0)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsOptional()
  price: number;

  @Type(() => VehicleColor)
  @IsArray()
  @IsUniqueColorIdArray()
  @IsOptional()
  colors: VehicleColor[];

  @IsBoolean()
  @IsOptional()
  active: boolean;

  @IsBoolean()
  @IsOptional()
  available: boolean;
}
