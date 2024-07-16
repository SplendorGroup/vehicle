import { Brand } from '@/domain/entities/brand';
import { DateValuesObject } from '../values-object/date';

export class BrandMapper {
  static toDomain(raw: any): Brand {
    return new Brand({
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

  static toPersistence(brand: Brand) {
    return {
      id: brand?.id,
      name: brand?.name,
      active: brand?.active,
      deleted: brand?.deleted,
      created_at: brand?.created_at.toISOString(),
      updated_at: brand?.updated_at
        ? new DateValuesObject(brand?.updated_at).toISOString()
        : undefined,
      deleted_at: brand?.deleted_at
        ? new DateValuesObject(brand?.deleted_at).toISOString()
        : undefined,
    };
  }

  static toResponse(brand: Brand) {
    return {
      id: brand?.id,
      name: brand?.name,
      active: brand?.active,
      deleted: brand?.deleted,
      createdAt: brand?.created_at.toISOString(),
      updatedAt: brand?.updated_at
        ? new DateValuesObject(brand?.updated_at).toISOString()
        : undefined,
      deletedAt: brand?.deleted_at
        ? new DateValuesObject(brand?.deleted_at).toISOString()
        : undefined,
    };
  }
}
