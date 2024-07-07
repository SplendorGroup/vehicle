import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, IsUUID, Length, Min } from 'class-validator';

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

export class UpdateVehicleDTO {
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
  @IsOptional()
  colors: VehicleColor[];

  @IsBoolean()
  @IsOptional()
  active: boolean;

  @IsBoolean()
  @IsOptional()
  available: boolean;
}

export class UpdateVehicleParamsDTO {
  @IsUUID()
  id: string;
}
