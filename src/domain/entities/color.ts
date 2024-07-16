import { randomUUID } from "crypto";

export class Color {
  id?: string;
  name: string;
  active?: boolean;
  deleted?: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;

  constructor(
    props: Partial<Color>,
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
