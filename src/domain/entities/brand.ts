import { randomUUID } from 'crypto';
import { Vehicle } from './vehicle';

export class Brand {
  id?: string;
  name: string;
  active?: boolean;
  deleted?: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  vehicle: Vehicle[];

  constructor(
    props: Partial<Brand>,
    options?: {
      update?: boolean;
    },
  ) {
     Object.assign(this, props);
     if (!options?.update) {
       this.id = randomUUID();
       this.created_at = new Date();
     } else {
       this.updated_at = new Date();
     }
  }
}
