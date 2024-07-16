import { Reservation } from './reservation';

export class Vehicle {
  id: string;
  brand_id: string;
  model: string;
  year: number;
  price: number;
  available: boolean;
  active: boolean;
  deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  reservation?: Reservation;

  constructor(
    props: Partial<Vehicle>,
    options?: {
      update?: boolean;
    },
  ) {
    Object.assign(this, props);

    if (!options?.update) {
      this.id = crypto.randomUUID();
    }
  }
}
