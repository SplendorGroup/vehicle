import { IsUUID } from 'class-validator';

export class DeleteBrandDTO {
  @IsUUID()
  id: string;
}
