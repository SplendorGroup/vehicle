import { randomUUID } from "crypto";

export class Reservation {
  id: string;
  client_id: string;
  order_id: string;
  user_id: string;
  vehicle_id: string;
  status: string;
  created_at: Date;
  updated_at: Date;

  constructor(props: Reservation, options?: { update?: boolean }) {
    Object.assign(this, props);

    if (!options?.update) {
      this.id = randomUUID();
      this.created_at = new Date();
    } else {
      this.updated_at = new Date();
    }
  }
}
