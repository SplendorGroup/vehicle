import { Injectable } from '@nestjs/common';
import { VehicleService } from '@/infraestructure/services/vehicle';
import { Vehicle } from '@/domain/entities/vehicle';
import { DataChangeById } from '@/infraestructure/types/data';
import { RequestUser } from '@/infraestructure/types/user';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class DeleteVehicleUseCase {
  constructor(private readonly vehicleService: VehicleService) {}

  async execute({ id, user }: DataChangeById) {
    const vehicle = await this.getVehicle(id);
    this.checkIfTheVehicleIsFound(vehicle);
    await this.deleteVehicle(id, user);
  }

  async getVehicle(id: string) {
    return await this.vehicleService.findById(id);
  }

  checkIfTheVehicleIsFound(vehicle: Vehicle) {
    if (!vehicle) {
      throw new RpcException({
        code: 1300,
        details: JSON.stringify({
          name: 'Vehicle Not Found',
          identify: 'VEHICLE_NOT_FOUND',
          status: 404,
          message: 'The specified vehicle could not be found.',
        }),
      });
    }
  }

  async deleteVehicle(id: string, user: RequestUser) {
    try {
      return await this.vehicleService.update(id, {
        deleted: true,
        active: false,
        deleted_at: new Date(),
        deleted_by: user?.id ?? "admin",
      });
    } catch {
      throw new RpcException({
        code: 1304,
        details: JSON.stringify({
          name: 'Vehicle Deletion Failed',
          identify: 'VEHICLE_DELETION_FAILED',
          status: 500,
          message: 'Failed to delete vehicle.',
        }),
      });
    }
  }
}
