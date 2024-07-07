import { IsUUID } from 'class-validator';

export class FindOneColorDTO {
  @IsUUID()
  id: string;
}
