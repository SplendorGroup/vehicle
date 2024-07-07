import { Injectable } from '@nestjs/common';
import { BrandService } from '@/infraestructure/services/brand';
import { Brand } from '@/domain/entities/brand';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class FindOneBrandUseCase {
  constructor(private readonly brandService: BrandService) {}

  async execute(id: string) {
    const brand = await this.getBrandById(id);
    this.checkIfTheBrandIsFound(brand);
    const data = this.transformResponse(brand)
    return data;
  }

  async getBrandById(id: string) {
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

  transformResponse(brand: Partial<Brand>) {
    return {
      ...brand,
      created_at: new Date(brand?.created_at).toISOString(),
    };
  }
}
