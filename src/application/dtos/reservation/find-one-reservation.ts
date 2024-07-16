import { IsString, IsNotEmpty } from 'class-validator';

export class FindOneReservationDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}
