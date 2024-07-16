import { Inject, Injectable } from '@nestjs/common';
import { IPrisma } from '@/domain/interfaces/irepository';
import { Vehicle } from '@/domain/entities/vehicle';

@Injectable()
export class VehicleService {
  @Inject('vehicle')
  public readonly vehicle: IPrisma<'vehicle'>;

  async findAll?(vehicle: Partial<Vehicle>): Promise<Vehicle[]> {
    return (await this.vehicle.findAll(vehicle)) as unknown as Vehicle[];
  }

  async findAllCompleted(
    vehicle: Partial<Vehicle>,
  ): Promise<Partial<Vehicle>[]> {
    return (await this.vehicle.findAllWithRelations(
      ['brand', 'colors.color'],
      vehicle,
    )) as unknown as Partial<Vehicle>[];
  }

  async findAllCompletedWithHighPrice(
    vehicle: Partial<Vehicle>,
  ): Promise<Partial<Vehicle>[]> {
    return (await this.vehicle.findAllWithRelations(['brand', 'colors.color'], {
      orderBy: [{ price: 'desc' }],
      ...vehicle,
    })) as unknown as Partial<Vehicle>[];
  }

  async findAllCompletedWithLowPrice(
    vehicle: Partial<Vehicle>,
  ): Promise<Partial<Vehicle>[]> {
    return (await this.vehicle.findAllWithRelations(['brand', 'colors.color'], {
      orderBy: [{ price: 'asc' }],
      ...vehicle,
    })) as unknown as Partial<Vehicle>[];
  }

  async findById(id: string): Promise<Vehicle> {
    return (await this.vehicle.findById(id)) as unknown as Vehicle;
  }

  async findByIdCompleted(id: string) {
    return await this.vehicle.findByIdWithRelations(id, [
      'brand',
      'colors.color',
    ]);
  }

  async findOne(vehicle: Partial<Vehicle>): Promise<Vehicle> {
    return (await this.vehicle.findOne(vehicle)) as unknown as Vehicle;
  }

  async create(vehicle: Vehicle): Promise<Vehicle> {
    return (await this.vehicle.create(vehicle)) as unknown as Vehicle;
  }

  async update(id: string, vehicle: Partial<Vehicle>): Promise<Vehicle> {
    return (await this.vehicle.update(id, vehicle)) as unknown as Vehicle;
  }

  async delete(id: string): Promise<void> {
    return await this.vehicle.deleteById(id);
  }

  async count(vehicle: Partial<Vehicle>): Promise<number> {
    return await this.vehicle.count(vehicle);
  }
}
