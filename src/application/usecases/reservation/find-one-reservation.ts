import { Injectable } from '@nestjs/common';
import { ReservationService } from '@/application/services/reservation';
import { ReservationMapper } from '@/domain/mappers/reservation';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class FindOneReservationUseCase {
  constructor(private readonly reservationService: ReservationService) {}

  async execute(id: string) {
    const reservation = await this.getReservationById(id);
    this.checkIfTheReservationIsFound(reservation);
    const data = this.transformResponse(reservation);
    return data;
  }

  async getReservationById(id: string) {
    return await this.reservationService.findOne({ id });
  }

  checkIfTheReservationIsFound(reservation: any) {
    if (!reservation) {
      throw new RpcException({
        code: 2202,
        details: JSON.stringify({
          name: 'Reservation Not Found',
          identify: 'RESERVATION_NOT_FOUND',
          status: 404,
          message: 'The specified reservation could not be found.',
        }),
      });
    }
  }

  transformResponse(reservation: any) {
    return ReservationMapper.toResponse(reservation);
  }
}
