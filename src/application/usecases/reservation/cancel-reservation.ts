import { Injectable } from '@nestjs/common';
import { ReservationService } from '@/application/services/reservation';
import { VehicleService } from '@/application/services/vehicle';
import { RpcException } from '@nestjs/microservices';
import { Reservation } from '.';

@Injectable()
export class CancelReservationUseCase {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly vehicleService: VehicleService,
  ) {}

  async execute(id: string) {
    const reservation = await this.getReservationById(id);
    this.checkIfReservationExists(reservation);

    const vehicle = await this.getVehicleById(reservation.vehicle_id);
    await this.updateVehicleAvailability(vehicle);

    await this.deleteReservation(id);

    return reservation;
  }

  async getReservationById(id: string) {
    return await this.reservationService.findOne({ id });
  }

  checkIfReservationExists(reservation: Partial<Reservation> | null) {
    if (!reservation) {
      throw new RpcException({
        code: 2402,
        details: JSON.stringify({
          name: 'Reservation Not Found',
          identify: 'RESERVATION_NOT_FOUND',
          status: 404,
          message: 'The specified reservation could not be found.',
        }),
      });
    }
  }

  async getVehicleById(vehicle_id: string) {
    return await this.vehicleService.findOne({ id: vehicle_id });
  }

  async updateVehicleAvailability(vehicle: any) {
    if (vehicle) {
      vehicle.available = true;
      await this.vehicleService.update(vehicle.id, { available: true });
    }
  }

  async deleteReservation(id: string) {
    await this.reservationService.delete(id);
  }
}
