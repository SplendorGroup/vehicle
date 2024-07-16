import { Injectable } from '@nestjs/common';
import { Vehicle } from '@/domain/entities/vehicle';
import { VehicleMapper } from '@/domain/mappers/vehicle';

@Injectable()
export class VehicleFactory {
  create(data: any): any {
    const vehicleDomain = VehicleMapper.toDomain(data);
    const vehicle = new Vehicle(vehicleDomain);
    return VehicleMapper.toPersistence(vehicle);
  }
}
