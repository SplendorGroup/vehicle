import { IsUUID } from 'class-validator';

export class DeleteColorDTO {
  @IsUUID()
  id: string;
}
