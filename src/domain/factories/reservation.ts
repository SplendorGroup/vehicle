import { Injectable } from '@nestjs/common';
import { Reservation } from '@/domain/entities/reservation';
import { ReservationMapper } from '@/domain/mappers/reservation';

@Injectable()
export class ReservationFactory {
  create(data: any): any {
    const reservationDomain = ReservationMapper.toDomain(data);
    const reservation = new Reservation(reservationDomain);
    return ReservationMapper.toPersistence(reservation);
  }
}
