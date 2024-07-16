import { Injectable } from '@nestjs/common';
import { VehicleService } from '@/application/services/vehicle';
import { RpcException } from '@nestjs/microservices';
import { Vehicle } from '@/domain/entities/vehicle';
import { Brand } from '@/domain/entities/brand';
import { VehicleColor } from '@/domain/entities/vehicle-color';
import { Color } from '@/domain/entities/color';

type VehicleCompleted = {
  colors: ({
    color: Color;
  } & VehicleColor)[];
  brand: Brand;
} & Vehicle;

@Injectable()
export class FindOneVehicleUseCase {
  constructor(private readonly vehicleService: VehicleService) {}

  async execute(id: string) {
    const vehicle = await this.getVehicleById(id);
    this.checkIfTheVehicleIsFound(vehicle);
    return this.transformResponse(vehicle);
  }

  async getVehicleById(id: string) {
    return (await this.vehicleService.findByIdCompleted(
      id,
    )) as unknown as VehicleCompleted;
  }

  checkIfTheVehicleIsFound(vehicle: Partial<Vehicle>) {
    if (!vehicle) {
      throw new RpcException({
        code: 1500,
        details: JSON.stringify({
          name: 'Vehicle Not Found',
          identify: 'VEHICLE_NOT_FOUND',
          status: 404,
          message: 'The specified vehicle could not be found.',
        }),
      });
    }
  }

  transformResponse(vehicle: VehicleCompleted) {
    return {
      ...vehicle,
      brand: vehicle?.brand?.name,
      created_at: new Date(vehicle.created_at).toISOString(),
      colors: vehicle.colors.flatMap(({ color_id, image, color, ...rest }) => {
        return {
          color_id,
          color: color?.name,
          image,
          default: rest.default,
        };
      }),
    };
  }
}
