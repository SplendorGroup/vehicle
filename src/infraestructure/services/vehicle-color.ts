import { Inject, Injectable } from '@nestjs/common';
import { IPrisma } from '@/infraestructure/interfaces/irepository';
import { VehicleColor } from '@/domain/entities/vehicle-color';

@Injectable()
export class VehicleColorService {
  @Inject('vehicle_color')
  public readonly vehicle_color: IPrisma<'vehicle_color'>;

  async findAll?(
    vehicle_color: Partial<VehicleColor>,
  ): Promise<VehicleColor[]> {
    return (await this.vehicle_color.findAll(
      vehicle_color,
    )) as unknown as VehicleColor[];
  }

  async findById(id: string): Promise<VehicleColor> {
    return (await this.vehicle_color.findById(id)) as unknown as VehicleColor;
  }

  async findOne(vehicle_color: Partial<VehicleColor>): Promise<VehicleColor> {
    return (await this.vehicle_color.findOne(
      vehicle_color,
    )) as unknown as VehicleColor;
  }

  async create(vehicle_color: VehicleColor): Promise<VehicleColor> {
    return (await this.vehicle_color.create(
      vehicle_color,
    )) as unknown as VehicleColor;
  }

  async createMany(
    vehicle_color: Partial<VehicleColor>[],
  ): Promise<VehicleColor> {
    return (await this.vehicle_color.createMany(
      vehicle_color,
    )) as unknown as VehicleColor;
  }

  async update(
    id: string,
    vehicle_color: Partial<VehicleColor>,
  ): Promise<VehicleColor> {
    return (await this.vehicle_color.update(
      id,
      vehicle_color,
    )) as unknown as VehicleColor;
  }

  async delete(id: string): Promise<void> {
    return await this.vehicle_color.deleteById(id);
  }

  async deleteByVehicleId(vehicle_id: string) {
    return await this.vehicle_color.deleteMany({ vehicle_id });
  }

  async count(vehicle_color: Partial<VehicleColor>): Promise<number> {
    return await this.vehicle_color.count(vehicle_color);
  }
}
