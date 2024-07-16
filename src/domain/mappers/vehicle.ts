import { Vehicle } from '@/domain/entities/vehicle';
import { DateValuesObject } from '../values-object/date';

export class VehicleMapper {
  static toDomain(raw: any): Vehicle {
    return new Vehicle({
      id: raw?._id,
      brand_id: raw?.brand_id,
      model: raw?.model,
      year: raw?.year,
      price: raw?.price,
      available: raw?.available,
      active: raw?.active,
      deleted: raw?.deleted,
      created_at: new DateValuesObject(raw?.created_at).toDate(),
      updated_at: raw?.updated_at
        ? new DateValuesObject(raw?.updated_at).toDate()
        : undefined,
      deleted_at: raw?.deleted_at
        ? new DateValuesObject(raw?.deleted_at).toDate()
        : undefined,
      reservation: raw?.reservation,
    });
  }

  static toPersistence(vehicle: Vehicle) {
    return {
      id: vehicle?.id,
      brand_id: vehicle?.brand_id,
      model: vehicle?.model,
      year: vehicle?.year,
      price: vehicle?.price,
      available: vehicle?.available,
      active: vehicle?.active,
      deleted: vehicle?.deleted,
      created_at: new DateValuesObject(vehicle?.created_at).toISOString(),
      updated_at: vehicle?.updated_at
        ? new DateValuesObject(vehicle?.updated_at).toISOString()
        : undefined,
      deleted_at: new DateValuesObject(vehicle?.deleted_at)
        ? vehicle?.deleted_at.toISOString()
        : undefined,
      reservation: vehicle?.reservation,
    };
  }

  static toResponse(vehicle: Vehicle) {
    return {
      id: vehicle?.id,
      brand_id: vehicle?.brand_id,
      model: vehicle?.model,
      year: vehicle?.year,
      price: vehicle?.price,
      available: vehicle?.available,
      active: vehicle?.active,
      deleted: vehicle?.deleted,
      created_at: new DateValuesObject(vehicle?.created_at).toISOString(),
      updated_at: vehicle?.updated_at
        ? new DateValuesObject(vehicle?.updated_at).toISOString()
        : undefined,
      deleted_at: new DateValuesObject(vehicle?.deleted_at)
        ? vehicle?.deleted_at.toISOString()
        : undefined,
      reservation: vehicle?.reservation,
    };
  }
}
