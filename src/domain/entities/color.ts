export class Color {
  id?: string;
  name: string;
  active?: boolean;
  deleted?: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by: string;
  updated_by?: string;
  deleted_by?: string;

  constructor(
    props: Partial<Color>,
    options?: {
      update?: boolean;
    },
  ) {
    Object.assign(this, props);

    if (!options?.update) {
      this.id = crypto.randomUUID();
    }

    if (props.created_at) {
      this.created_at = new Date();
    }
  }
}
