import { Injectable } from '@nestjs/common';
import { Brand } from '@/domain/entities/brand';
import { BrandMapper } from '@/domain/mappers/brand';

@Injectable()
export class BrandFactory {
  create(data: any): any {
    const brandDomain = BrandMapper.toDomain(data);
    const brand = new Brand(brandDomain);
    return BrandMapper.toPersistence(brand);
  }
}
