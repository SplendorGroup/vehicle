import { Inject, Injectable } from '@nestjs/common';
import { IPrisma } from '@/infraestructure/interfaces/irepository';
import { Brand } from '@/domain/entities/brand';

@Injectable()
export class BrandService {
  @Inject('brand')
  public readonly brand: IPrisma<'brand'>;

  async findAll?(brand: Partial<Brand>): Promise<Brand[]> {
    return (await this.brand.findAll(brand)) as unknown as Brand[];
  }

  async findById(id: string): Promise<Brand> {
    return (await this.brand.findById(id)) as unknown as Brand;
  }

  async findOne(brand: Partial<Brand>): Promise<Brand> {
    return (await this.brand.findOne(brand)) as unknown as Brand;
  }

  async create(brand: Brand): Promise<Brand> {
    return (await this.brand.create(brand)) as unknown as Brand;
  }

  async update(id: string, brand: Partial<Brand>): Promise<Brand> {
    return (await this.brand.update(id, brand)) as unknown as Brand;
  }

  async delete(id: string): Promise<void> {
    return await this.brand.deleteById(id);
  }

  async count(brand: Partial<Brand>): Promise<number> {
    return await this.brand.count(brand);
  }
}
