import { Injectable } from '@nestjs/common';
import { VehicleService } from '@/infraestructure/services/vehicle';
import { Vehicle } from '@/domain/entities/vehicle';
import { DataMount } from '@/infraestructure/types/data';
import { RequestUser } from '@/infraestructure/types/user';
import { RpcException } from '@nestjs/microservices';
import { CreateVehicleDTO } from '@/application/dtos/vehicle/create-vehicle';
import { VehicleColor } from '@/domain/entities/vehicle-color';
import { ColorService } from '@/infraestructure/services/color';
import { Color } from '@/domain/entities/color';
import { VehicleColorService } from '@/infraestructure/services/vehicle-color';
import { BrandService } from '@/infraestructure/services/brand';
import { Brand } from '@/domain/entities/brand';

type VehicleCompleted = {
  colors: ({
    color: Color;
  } & VehicleColor)[];
  brand: Brand;
} & Vehicle;

@Injectable()
export class CreateVehicleUseCase {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly colorService: ColorService,
    private readonly vehicleColorService: VehicleColorService,
    private readonly brandService: BrandService,
  ) {}

  async execute({ body: data, user }: DataMount<Partial<CreateVehicleDTO>>) {
    const brand = await this.getBrandById(data.brand_id);
    this.checkIfTheBrandIsFound(brand);

    const vehicle = await this.getVehicleEqual({
      brand_id: data.brand_id,
      model: data.model,
    });

    this.checkIfTheVehicleExists(vehicle);
    const color_ids = this.getColorIds(data.colors);

    const colors_checked_results = await this.checkColorIds(color_ids);
    this.checkAllColorsFound(colors_checked_results);

    const colors_states = this.getColorDefaultState(data.colors);
    this.checkIfExistsOnlyOneColorDefault(colors_states);

    const create_vehicle = await this.createVehicle(data, user);
    const vehicle_colors_payload = this.bindvVehicleAtColorsPayload(
      create_vehicle.id,
      data.colors,
      user?.id,
    );

    await this.saveVehicleColors(vehicle_colors_payload);
    const vehicle_completed = await this.getVehicleCompletedById(
      create_vehicle.id,
    );

    return this.transformResponse(vehicle_completed);
  }

  async createVehicle(data: Partial<Vehicle>, user: RequestUser) {
    try {
      const vehicle = new Vehicle({
        brand_id: data.brand_id,
        model: data.model,
        year: data.year,
        price: data.price,
        available: data.available,
        created_by: user?.id ?? 'admin',
      });
      return await this.vehicleService.create(vehicle);
    } catch {
      throw new RpcException({
        code: 1302,
        details: JSON.stringify({
          name: 'Vehicle Creation Failed',
          identify: 'Vehicle_CREATION_FAILED',
          status: 500,
          message: 'Failed to create vehicle.',
        }),
      });
    }
  }

  async getBrandById(brand_id: string) {
    return await this.brandService.findById(brand_id);
  }

  checkIfTheBrandIsFound(brand: Brand) {
    if (!brand) {
      throw new RpcException({
        code: 1400,
        details: JSON.stringify({
          name: 'Brand Not Found',
          identify: 'BRAND_NOT_FOUND',
          status: 404,
          message: 'The specified brand could not be found.',
        }),
      });
    }
  }

  async getVehicleEqual({ brand_id, model }) {
    return await this.vehicleService.findOne({ brand_id, model });
  }

  async getVehicleCompletedById(id: string) {
    return (await this.vehicleService.findByIdCompleted(
      id,
    )) as unknown as VehicleCompleted;
  }

  getColorIds(colors: CreateVehicleDTO['colors']) {
    return colors.flatMap(({ color_id }) => color_id);
  }

  getColorDefaultState(colors: CreateVehicleDTO['colors']) {
    return colors.flatMap((color) => color.default);
  }

  checkIfExistsOnlyOneColorDefault(colors: VehicleColor['default'][]) {
    const count_true = colors.filter((color) => color === true).length;

    if (count_true > 1) {
      throw new RpcException({
        code: 1501,
        details: JSON.stringify({
          name: 'Colour Already Defined as Default',
          identify: 'COLOR_ALREADY_DEFINED_DEFAULT',
          status: 409,
          message: 'There colour already set as a default.',
        }),
      });
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
        code: 1500,
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
    return colors.flatMap((vehicle_color) => {
      return new VehicleColor({
        vehicle_id,
        ...vehicle_color,
        created_by: user_id ?? "admin",
      });
    });
  }

  async saveVehicleColors(vehicle_colors: VehicleColor[]) {
    return await this.vehicleColorService.createMany(vehicle_colors);
  }

  checkIfTheVehicleExists(vehicle: Vehicle) {
    if (vehicle) {
      throw new RpcException({
        code: 1301,
        details: JSON.stringify({
          name: 'Vehicle Already Exists',
          identify: 'VEHICLE_ALREADY_EXISTS',
          status: 409,
          message: 'The vehicle already exists.',
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
