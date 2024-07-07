import { Injectable } from '@nestjs/common';
import { Brand } from '@/domain/entities/brand';
import { BrandService } from '@/infraestructure/services/brand';
import { DataChange } from '@/infraestructure/types/data';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UpdateBrandUseCase {
  constructor(private readonly brandService: BrandService) {}

  async execute({ id, body: data }: DataChange<Partial<Brand>>) {
    const brand = await this.getBrand(id);
    this.checkIfTheBrandIsFound(brand);
    const data_response = await this.updateBrand(id, data);
    return this.transformResponse(data_response)
  }

  async getBrand(id: string) {
    return await this.brandService.findById(id);
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

  async updateBrand(id: string, data: Partial<Brand>) {
    try {
      const brand = new Brand(data, { update: true });
      return await this.brandService.update(id, brand);
    } catch {
      throw new RpcException({
        code: 1403,
        details: JSON.stringify({
          name: 'Brand Update Failed',
          identify: 'BRAND_UPDATE_FAILED',
          status: 500,
          message: 'Failed to update brand.',
        }),
      });
    }
  }

  transformResponse(brand: Partial<Brand>) {
    return {
      ...brand,
      created_at: new Date(brand.created_at).toISOString(),
    };
  }
}
