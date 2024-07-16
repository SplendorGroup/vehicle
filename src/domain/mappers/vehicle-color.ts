import { VehicleColor } from '../entities/vehicle-color';
import { DateValuesObject } from '../values-object/date';

export class VehicleColorMapper {
  static toDomain(raw: any): VehicleColor {
    return new VehicleColor({
      id: raw?._id,
      vehicle_id: raw?.vehicle_id,
      color_id: raw?.color_id,
      image: raw?.image,
      default: raw?.default,
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

  static toPersistence(vehicle_color: VehicleColor) {
    return {
      id: vehicle_color?.id,
      vehicle_id: vehicle_color?.vehicle_id,
      color_id: vehicle_color?.color_id,
      image: vehicle_color?.image,
      default: vehicle_color?.default,
      deleted: vehicle_color?.deleted,
      created_at: new DateValuesObject(vehicle_color?.created_at).toISOString(),
      updated_at: vehicle_color?.updated_at
        ? new DateValuesObject(vehicle_color?.updated_at).toISOString()
        : undefined,
      deleted_at: vehicle_color?.deleted_at
        ? new DateValuesObject(vehicle_color?.deleted_at).toISOString()
        : undefined,
    };
  }

  static toResponse(vehicle_color: VehicleColor) {
    return {
      id: vehicle_color?.id,
      vehicle_id: vehicle_color?.vehicle_id,
      color_id: vehicle_color?.color_id,
      image: vehicle_color?.image,
      default: vehicle_color?.default,
      deleted: vehicle_color?.deleted,
      created_at: new DateValuesObject(vehicle_color?.created_at).toISOString(),
      updated_at: vehicle_color?.updated_at
        ? new DateValuesObject(vehicle_color?.updated_at).toISOString()
        : undefined,
      deleted_at: new DateValuesObject(vehicle_color?.deleted_at)
        ? vehicle_color?.deleted_at.toISOString()
        : undefined,
    };
  }
}
