import { Reservation } from '@/domain/entities/reservation';
import { DateValuesObject } from '../values-object/date';

export class ReservationMapper {
  static toDomain(raw: any): Reservation {
    return new Reservation({
      id: raw?._id,
      client_id: raw?.client_id,
      order_id: raw?.order_id,
      user_id: raw?.user_id,
      vehicle_id: raw?.vehicle_id,
      status: raw?.status,
      created_at: new DateValuesObject(raw?.created_at).toDate(),
      updated_at: raw?.updated_at
        ? new DateValuesObject(raw?.updated_at).toDate()
        : undefined,
    });
  }

  static toPersistence(reservation: Reservation) {
    return {
      id: reservation?.id,
      client_id: reservation?.client_id,
      order_id: reservation?.order_id,
      user_id: reservation?.user_id,
      vehicle_id: reservation?.vehicle_id,
      status: reservation?.status,
      created_at: new DateValuesObject(reservation?.created_at).toISOString(),
      updated_at: reservation?.updated_at
        ? new DateValuesObject(reservation?.updated_at).toISOString()
        : undefined,
    };
  }

  static toResponse(reservation: Reservation) {
    return {
      id: reservation?.id,
      client_id: reservation?.client_id,
      order_id: reservation?.order_id,
      user_id: reservation?.user_id,
      vehicle_id: reservation?.vehicle_id,
      status: reservation?.status,
      created_at: new DateValuesObject(reservation?.created_at).toISOString(),
      updated_at: reservation?.updated_at
        ? new DateValuesObject(reservation?.updated_at).toISOString()
        : undefined,
    };
  }
}
