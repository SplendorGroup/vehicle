import { IsUUID } from 'class-validator';

export class FindOneBrandDTO {
  @IsUUID()
  id: string;
}
