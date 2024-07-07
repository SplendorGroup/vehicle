import { IsUUID } from 'class-validator';

export class DeleteVehicleDTO {
  @IsUUID()
  id: string;
}
