import { IsString, IsNotEmpty } from 'class-validator';

export class CancelReservationDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}
