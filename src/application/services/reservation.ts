import { Inject, Injectable } from '@nestjs/common';
import { Reservation } from '@/domain/entities/reservation';
import { IPrisma } from '@/domain/interfaces/irepository';
import { ReservationMapper } from '@/domain/mappers/reservation';
import { dateIsExpired } from '@/infraestructure/helpers/date';

@Injectable()
export class ReservationService {
  constructor(
    @Inject('reservation')
    private readonly reservation: IPrisma<'reservation'>,
  ) {}

  async create(data: Reservation): Promise<Reservation> {
    const raw = await this.reservation.create(data);
    return ReservationMapper.toDomain(raw);
  }

  async findAll(filter: any): Promise<Reservation[] | []> {
    const raw = await this.reservation.findAll(filter);
    return raw.length > 0
      ? raw.flatMap((raw) => ReservationMapper.toDomain(raw))
      : [];
  }

  async findOne(filter: any): Promise<Reservation | null> {
    const raw = await this.reservation.findOne(filter);
    return raw ? ReservationMapper.toDomain(raw) : null;
  }

  async count(filter: any): Promise<number> {
    return await this.reservation.count(filter);
  }

  async findExpiredReservations(): Promise<Reservation[]> {
    const raws = await this.reservation.findAll({
      status: 'reserved',
    });

    return raws.flatMap((reservation) => {
      if (dateIsExpired(reservation.created_at, 72, 'hours')) {
        return ReservationMapper.toDomain(reservation);
      }
    });
  }

  async delete(id: string): Promise<void> {
    await this.reservation.deleteById(id);
  }
}
