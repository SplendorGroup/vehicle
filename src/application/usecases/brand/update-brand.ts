import { BrandService } from '@/application/services/brand';
import { BrandFactory } from '@/domain/factories/brand';
import { BrandMapper } from '@/domain/mappers/brand';
import { DataChange } from '@/domain/types/data';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UpdateBrandUseCase {
  constructor(
    private readonly brandService: BrandService,
    private readonly brandFactory: BrandFactory,
  ) {}

  async execute({ id, body: data }: DataChange<Partial<BrandMapper>>) {
    const brand = await this.getBrand(id);
    this.checkIfTheBrandIsFound(brand);
    const data_response = await this.updateBrand(id, data);
    return this.transformResponse(data_response);
  }

  async getBrand(id: string) {
    return await this.brandService.findById(id);
  }

  checkIfTheBrandIsFound(brand: any) {
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

  async updateBrand(id: string, data: Partial<BrandMapper>) {
    try {
      const brandDomain = this.brandFactory.create({ ...data, id });
      const updatedBrand = await this.brandService.update(id, brandDomain);
      return updatedBrand;
    } catch {
      throw new RpcException({
        code: 1603,
        details: JSON.stringify({
          name: 'Brand Update Failed',
          identify: 'BRAND_UPDATE_FAILED',
          status: 500,
          message: 'Failed to update brand.',
        }),
      });
    }
  }

  transformResponse(brand: any) {
    return BrandMapper.toResponse(brand);
  }
}
