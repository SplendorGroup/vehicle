import { Injectable } from '@nestjs/common';
import { VehicleService } from '@/infraestructure/services/vehicle';
import { Vehicle } from '@/domain/entities/vehicle';
import { Data } from '@/infraestructure/types/data';
import { Pagination } from '@/infraestructure/types/pagination';
import { VehicleColor } from '@/domain/entities/vehicle-color';
import { Color } from '@/domain/entities/color';
import { Brand } from '@/domain/entities/brand';

@Injectable()
export class FindAllVehicleUseCase {
  constructor(private readonly vehicleService: VehicleService) {}

  async execute({ ...filter }: Data<Partial<Vehicle>>) {
    const per_page = this.limitPerPage();
    const pagination = this.pagination(filter, per_page);
    const order = this.getOrder(filter);
    const filter_payload = this.mountFilter(filter, pagination);
    const total = await this.countAllvehicles(filter);
    const page = this.getPage(pagination);
    const vehicles = await this.processOrdenation(filter_payload, order);
    const in_page = this.countvehiclesFiltered(vehicles);
    const pages = this.countPages(total, per_page);

    const vehicles_response = this.transformResponse(vehicles);
    return this.findAllVehiclesToResponse({
      total,
      pages,
      page,
      per_page,
      in_page,
      data: vehicles_response,
    });
  }

  protected pagination(
    data: Omit<Data<Partial<Vehicle>>, 'user'>,
    limit: number,
  ) {
    if (!data?.filter?.page || data?.filter?.page <= 1) {
      return {
        skip: 1,
        take: limit,
      };
    }

    const page = parseInt(Number(data?.filter?.page).toString());
    return {
      skip: page <= 0 ? 1 : page,
      take: limit,
    };
  }

  limitPerPage() {
    const page_limit = Number(process.env.PAGE_LIMIT);
    return !isNaN(page_limit) ? page_limit : 10;
  }

  getOrder(data: Data<Partial<Vehicle>>) {
    const order = data?.filter?.order;
    return order;
  }

  getPage(pagination: ReturnType<FindAllVehicleUseCase['pagination']>) {
    return pagination.skip;
  }

  mountFilter(
    data: Omit<Data<Partial<Vehicle>>, 'user'>,
    pagination: ReturnType<FindAllVehicleUseCase['pagination']>,
  ) {
    delete data?.filter?.page;
    delete data?.filter?.order;
    return {
      ...data?.filter,
      ...pagination,
      active: true,
      deleted: false,
    };
  }

  async selectWithFilterWithoutOrderDefined(
    filter: ReturnType<FindAllVehicleUseCase['mountFilter']>,
    order: string,
  ) {
    if (!order) {
      return (await this.vehicleService.findAllCompleted(filter)) as Vehicle[];
    }
  }

  async selectWithFilterWithOrderHighPrice(
    filter: ReturnType<FindAllVehicleUseCase['mountFilter']>,
    order: string,
  ) {
    if (order == 'HIGH_PRICE') {
      return (await this.vehicleService.findAllCompletedWithHighPrice(
        filter,
      )) as Vehicle[];
    }
  }

  async selectWithFilterWithOrderLowPrice(
    filter: ReturnType<FindAllVehicleUseCase['mountFilter']>,
    order: string,
  ) {
    if (order == 'LOW_PRICE') {
      return (await this.vehicleService.findAllCompletedWithLowPrice(
        filter,
      )) as Vehicle[];
    }
  }

  async processOrdenation(
    filter: ReturnType<FindAllVehicleUseCase['mountFilter']>,
    order: string,
  ) {
    const results = await Promise.all([
      this.selectWithFilterWithoutOrderDefined(filter, order),
      this.selectWithFilterWithOrderHighPrice(filter, order),
      this.selectWithFilterWithOrderLowPrice(filter, order),
    ]);

    console.log(results)

    for (const result of results) {
      if (result != undefined) {
        return result;
      }
    }

    return [];
  }

  countvehiclesFiltered(vehicle: Vehicle[]) {
    return vehicle.length;
  }

  async countAllvehicles(data: Omit<Data<Partial<Vehicle>>, 'user'>) {
    return await this.vehicleService.count({
      ...data?.filter,
      active: true,
      deleted: false
    });
  }

  countPages(total_vehicles: number, per_page: number) {
    return Math.floor(total_vehicles / per_page);
  }

  findAllVehiclesToResponse(data: Pagination<Vehicle | any>) {
    const { total, page, per_page, in_page, pages, data: vehicle } = data;
    return {
      total,
      page,
      pages,
      per_page,
      in_page,
      data: vehicle,
    };
  }

  transformResponse(
    vehicles: Partial<
      {
        colors: ({
          color: Color;
        } & VehicleColor)[];
        brand: Brand;
      } & Vehicle
    >[],
  ) {
    return vehicles.flatMap((vehicle) => {
      return {
        ...vehicle,
        brand: vehicle.brand.name,
        created_at: new Date(vehicle.created_at).toISOString(),
        colors: vehicle.colors.flatMap(
          ({ color_id, image, color, ...rest }) => {
            return {
              color_id,
              color: color?.name,
              image,
              default: rest.default,
            };
          },
        ),
      };
    });
  }
}
