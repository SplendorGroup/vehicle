import { IsString, IsNotEmpty } from 'class-validator';

export class CreateReservationDTO {
  @IsString()
  @IsNotEmpty()
  client_id: string;

  @IsString()
  @IsNotEmpty()
  order_id: string;

  @IsString()
  @IsNotEmpty()
  vehicle_id: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
