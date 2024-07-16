import { Injectable } from '@nestjs/common';
import { ReservationService } from '@/application/services/reservation';
import { VehicleService } from '@/application/services/vehicle';
import { Vehicle } from '@/domain/entities/vehicle';

@Injectable()
export class CheckReservationExpiryUseCase {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly vehicleService: VehicleService,
  ) {}

  async execute() {
    const expiredReservations = await this.getExpiredReservations();

    for (const reservation of expiredReservations) {
      const vehicle = await this.getVehicleById(reservation.vehicle_id);
      await this.updateVehicleAvailability(vehicle);
      await this.deleteReservation(reservation.id);
    }
  }

  async getExpiredReservations() {
    return await this.reservationService.findExpiredReservations();
  }

  async getVehicleById(vehicle_id: string) {
    return await this.vehicleService.findOne({ id: vehicle_id });
  }

  async updateVehicleAvailability(vehicle: Partial<Vehicle> | null) {
    if (vehicle) {
      vehicle.available = true;
      await this.vehicleService.update(vehicle.id, { available: true });
    }
  }

  async deleteReservation(id: string) {
    await this.reservationService.delete(id);
  }
}
