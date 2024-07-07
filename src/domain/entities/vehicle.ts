export class Vehicle {
  id?: string;
  brand_id: string;
  model: string;
  year: number;
  price: number;
  active: boolean;
  available: boolean;
  deleted?: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by: string;
  updated_by?: string;
  deleted_by?: string;

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
