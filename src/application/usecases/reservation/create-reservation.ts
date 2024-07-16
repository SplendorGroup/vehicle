import { Injectable } from '@nestjs/common';
import { ReservationService } from '@/application/services/reservation';
import { ReservationFactory } from '@/domain/factories/reservation';
import { VehicleService } from '@/application/services/vehicle';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CreateReservationUseCase {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly reservationFactory: ReservationFactory,
    private readonly vehicleService: VehicleService,
  ) {}

  async execute(data: any) {
    const vehicle = await this.getVehicleById(data.vehicle_id);
    this.checkIfVehicleExists(vehicle);
    this.checkIfVehicleAvailable(vehicle);

    const reservation = this.createReservation(data);
    await this.updateVehicleAvailability(vehicle);

    await this.saveReservation(reservation);

    return reservation;
  }

  async getVehicleById(vehicle_id: string) {
    return await this.vehicleService.findOne({ id: vehicle_id });
  }

  checkIfVehicleExists(vehicle: any) {
    if (!vehicle) {
      throw new RpcException({
        code: 2400,
        details: JSON.stringify({
          name: 'Vehicle Not Found',
          identify: 'VEHICLE_NOT_FOUND',
          status: 404,
          message: 'The specified vehicle could not be found.',
        }),
      });
    }
  }

  checkIfVehicleAvailable(vehicle: any) {
    if (!vehicle.available) {
      throw new RpcException({
        code: 2401,
        details: JSON.stringify({
          name: 'Vehicle Not Available',
          identify: 'VEHICLE_NOT_AVAILABLE',
          status: 409,
          message: 'The specified vehicle is not available for reservation.',
        }),
      });
    }
  }

  createReservation(data: any) {
    return this.reservationFactory.create(data);
  }

  async updateVehicleAvailability(vehicle: any) {
    vehicle.available = false;
    await this.vehicleService.update(vehicle.id, { available: false });
  }

  async saveReservation(reservation: any) {
    await this.reservationService.create(reservation);
  }
}
