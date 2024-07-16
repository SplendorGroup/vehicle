import { randomUUID } from "crypto";

export class VehicleColor {
  id?: string;
  vehicle_id: string;
  color_id: string;
  image?: string;
  default: boolean;
  deleted?: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;

  constructor(
    props: Partial<VehicleColor>,
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
