import { Color } from '@/domain/entities/color';
import { DateValuesObject } from '../values-object/date';

export class ColorMapper {
  static toDomain(raw: any): Color {
    return new Color({
      id: raw?._id,
      name: raw?.name,
      active: raw?.active,
      deleted: raw?.deleted,
      created_at: new DateValuesObject(raw?.created_at).toDate(),
      updated_at: raw?.updated_at
        ? new DateValuesObject(raw?.updated_at).toDate()
        : undefined,
      deleted_at: raw?.deleted_at
        ? new DateValuesObject(raw?.deleted_at).toDate()
        : undefined,
    });
  }

  static toPersistence(color: Color) {
    return {
      id: color?.id,
      name: color?.name,
      active: color?.active,
      deleted: color?.deleted,
      created_at: color?.created_at.toISOString(),
      updated_at: color?.updated_at
        ? new DateValuesObject(color?.updated_at).toISOString()
        : undefined,
      deleted_at: color?.deleted_at
        ? new DateValuesObject(color?.deleted_at).toISOString()
        : undefined,
    };
  }

  static toResponse(color: Color) {
    return {
      id: color?.id,
      name: color?.name,
      active: color?.active,
      deleted: color?.deleted,
      created_at: new DateValuesObject(color?.created_at).toISOString(),
      updated_at: color?.updated_at
        ? new DateValuesObject(color?.updated_at).toISOString()
        : undefined,
      deleted_at: color?.deleted_at
        ? new DateValuesObject(color?.deleted_at).toISOString()
        : undefined,
    };
  }
}
