import { Injectable } from '@nestjs/common';
import { VehicleService } from '@/application/services/vehicle';
import { Vehicle } from '@/domain/entities/vehicle';
import { DataMountById } from '@/domain/types/data';
import { RequestUser } from '@/domain/types/user';
import { RpcException } from '@nestjs/microservices';
import { CreateVehicleDTO } from '@/application/dtos/vehicle/create-vehicle';
import { VehicleColor } from '@/domain/entities/vehicle-color';
import { ColorService } from '@/application/services/color';
import { Color } from '@/domain/entities/color';
import { VehicleColorService } from '@/application/services/vehicle-color';
import { BrandService } from '@/application/services/brand';
import { Brand } from '@/domain/entities/brand';

type VehicleCompleted = {
  colors: ({
    color: Color;
  } & VehicleColor)[];
  brand: Brand;
} & Vehicle;

@Injectable()
export class UpdateVehicleUseCase {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly colorService: ColorService,
    private readonly vehicleColorService: VehicleColorService,
    private readonly brandService: BrandService,
  ) {}

  async execute({
    body: data,
    user,
    id,
  }: DataMountById<Partial<CreateVehicleDTO>>) {
    const brand = await this.getBrandById(data.brand_id);
    this.checkIfTheBrandIsFound(brand);

    const vehicle = await this.getVehicleById(id);
    this.checkIfTheVehicleExists(vehicle);

    const color_ids = this.getColorIds(data.colors);
    const colors_checked_results = await this.checkColorIds(color_ids);
    this.checkAllColorsFound(colors_checked_results);

    const colors_states = this.getColorDefaultState(data.colors);
    this.checkIfExistsOnlyOneColorDefault(colors_states);

    const updated_vehicle = await this.updateVehicle(data, user, id);

    const vehicle_colors_payload = this.bindvVehicleAtColorsPayload(
      id,
      data.colors,
      user?.id,
    );

    await this.saveVehicleColors(vehicle_colors_payload, updated_vehicle.id);

    const vehicle_completed = await this.getVehicleCompletedById(id);

    return this.transformResponse(vehicle_completed);
  }

  async getBrandById(brand_id: string) {
    return await this.brandService.findById(brand_id);
  }

  checkIfTheBrandIsFound(brand: Brand) {
    if (!brand) {
      throw new RpcException({
        code: 1600,
        details: JSON.stringify({
          name: 'Brand Not Found',
          identify: 'BRAND_NOT_FOUND',
          status: 404,
          message: 'The specified brand could not be found.',
        }),
      });
    }
  }

  async getVehicleById(id: string) {
    return await this.vehicleService.findById(id);
  }

  async getVehicleCompletedById(id: string) {
    return (await this.vehicleService.findByIdCompleted(
      id,
    )) as unknown as VehicleCompleted;
  }

  async updateVehicle(
    data: Partial<CreateVehicleDTO>,
    user: RequestUser,
    vehicleId: string,
  ) {
    console.log(data);
    try {
      const vehicle = new Vehicle(
        {
          brand_id: data.brand_id,
          model: data.model,
          year: data.year,
          price: data.price,
          available: data.available,
          updated_at: new Date(),
        },
        { update: true },
      );
      return await this.vehicleService.update(vehicleId, vehicle);
    } catch {
      throw new RpcException({
        code: 1503,
        details: JSON.stringify({
          name: 'Vehicle Update Failed',
          identify: 'VEHICLE_UPDATE_FAILED',
          status: 500,
          message: 'Failed to update vehicle.',
        }),
      });
    }
  }

  getColorDefaultState(colors: CreateVehicleDTO['colors']) {
    return colors.flatMap((color) => color.default);
  }

  checkIfExistsOnlyOneColorDefault(colors: VehicleColor['default'][]) {
    const count_true = colors.filter((color) => color === true).length;

    if (count_true > 1) {
      throw new RpcException({
        code: 1701,
        details: JSON.stringify({
          name: 'Colour Already Defined as Default',
          identify: 'COLOR_ALREADY_DEFINED_DEFAULT',
          status: 409,
          message: 'There colour already set as a default.',
        }),
      });
    }
  }


  getColorIds(colors: CreateVehicleDTO['colors']) {
    try {
      return colors.flatMap(({ color_id }) => color_id);
    } catch {
      return [];
    }
  }

  async checkColorIds(color_ids: string[]) {
    return await Promise.all(
      color_ids.flatMap(async (color_id) => {
        return await this.colorService.findById(color_id);
      }),
    );
  }

  checkAllColorsFound(colors: Color[]) {
    const car_colors = colors.some((color) => color === null);

    if (car_colors) {
      throw new RpcException({
        code: 1700,
        details: JSON.stringify({
          name: 'Color Not Found',
          identify: 'COLOR_NOT_FOUND',
          status: 404,
          message: 'The specified color could not be found.',
        }),
      });
    }
  }

  bindvVehicleAtColorsPayload(
    vehicle_id: string,
    colors: CreateVehicleDTO['colors'],
    user_id: string,
  ) {
    try {
      return colors.flatMap((vehicle_color) => {
        return new VehicleColor({
          vehicle_id,
          ...vehicle_color,
        });
      });
    } catch (error) {
      return [];
    }
  }

  async saveVehicleColors(
    vehicle_colors: Partial<VehicleColor>[],
    vehicle_id: string,
  ) {
    console.log(vehicle_colors);
    await this.vehicleColorService.deleteByVehicleId(vehicle_id);
    return await this.vehicleColorService.createMany(vehicle_colors);
  }

  checkIfTheVehicleExists(vehicle: Vehicle) {
    if (!vehicle) {
      throw new RpcException({
        code: 1501,
        details: JSON.stringify({
          name: 'Vehicle Not Found',
          identify: 'VEHICLE_NOT_FOUND',
          status: 404,
          message: 'The vehicle could not be found.',
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
