import { Injectable } from '@nestjs/common';
import { Brand } from '@/domain/entities/brand';
import { BrandService } from '@/application/services/brand';
import { DataChangeById } from '@/domain/types/data';
import { RequestUser } from '@/domain/types/user';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class DeleteBrandUseCase {
  constructor(private readonly brandService: BrandService) {}

  async execute({ id, user }: DataChangeById) {
    const brand = await this.getBrand(id);
    this.checkIfTheBrandIsFound(brand);
    await this.deleteBrand(id, user);
  }

  async getBrand(id: string) {
    return await this.brandService.findById(id);
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

  async deleteBrand(id: string, user: RequestUser) {
    try {
      return await this.brandService.update(id, {
        deleted: true,
        active: false,
        deleted_at: new Date(),
      });
    } catch {
      throw new RpcException({
        code: 1604,
        details: JSON.stringify({
          name: 'Brand Deletion Failed',
          identify: 'BRAND_DELETION_FAILED',
          status: 500,
          message: 'Failed to delete brand.',
        }),
      });
    }
  }
}
