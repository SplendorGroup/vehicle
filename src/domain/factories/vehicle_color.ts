import { Injectable } from '@nestjs/common';
import { VehicleColor } from '@/domain/entities/vehicle-color';
import { VehicleColorMapper } from '@/domain/mappers/vehicle-color';

@Injectable()
export class VehicleColorFactory {
  create(data: any): any {
    const vehicleColorDomain = VehicleColorMapper.toDomain(data);
    const vehicleColor = new VehicleColor(vehicleColorDomain);
    return VehicleColorMapper.toPersistence(vehicleColor);
  }
}
