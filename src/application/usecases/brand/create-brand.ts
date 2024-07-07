import { Injectable } from '@nestjs/common';
import { Brand } from '@/domain/entities/brand';
import { DataMount } from '@/infraestructure/types/data';
import { RequestUser } from '@/infraestructure/types/user';
import { BrandService } from '@/infraestructure/services/brand';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CreateBrandUseCase {
  constructor(private readonly brandService: BrandService) {}

  async execute({ body: data, user }: DataMount<Partial<Brand>>) {
    const brand = await this.getBrandByName(data.name);
    this.checkIfTheBrandExists(brand);
    
    const data_response = await this.createBrand(data, user);
    return this.transformResponse(data_response)
  }

  async createBrand(data: Partial<Brand>, user: RequestUser) {
    try {
      const brand = new Brand({
        ...data,
        created_by: user?.id ?? "admin",
      });
      return await this.brandService.create(brand);
    } catch {
      throw new RpcException({
        code: 1402,
        details: JSON.stringify({
          name: 'Brand Creation Failed',
          identify: 'BRAND_CREATION_FAILED',
          status: 500,
          message: 'Failed to create brand.',
        }),
      });
    }
  }

  async getBrandByName(name: string) {
    return await this.brandService.findOne({ name });
  }

  checkIfTheBrandExists(brand: Brand) {
    if (brand) {
      throw new RpcException({
        code: 1401,
        details: JSON.stringify({
          name: 'Brand Already Exists',
          identify: 'BRAND_ALREADY_EXISTS',
          status: 409,
          message: 'The brand already exists.',
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
