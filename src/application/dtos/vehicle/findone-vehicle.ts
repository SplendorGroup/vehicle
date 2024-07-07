import { IsUUID } from 'class-validator';

export class FindOneVehicleDTO {
  @IsUUID()
  id: string;
}
