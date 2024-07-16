import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class FindAllReservationDTO {
  @IsString()
  @IsOptional()
  client_id?: string;

  @IsString()
  @IsOptional()
  user_id?: string;

  @IsString()
  @IsOptional()
  vehicle_id?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number;
}
