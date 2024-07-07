import { Injectable } from '@nestjs/common';
import { Brand } from '@/domain/entities/brand';
import { Data } from '@/infraestructure/types/data';
import { Pagination } from '@/infraestructure/types/pagination';
import { BrandService } from '@/infraestructure/services/brand';

@Injectable()
export class FindAllBrandUseCase {
  constructor(private readonly brandService: BrandService) {}

  async execute({ ...filter }: Data<Partial<Brand>>) {
    const per_page = this.limitPerPage();
    const pagination = this.pagination(filter, per_page);
    const filter_payload = this.mountFilter(filter, pagination);

    const total = await this.countAllbrands(filter);
    const page = this.getPage(pagination);
    const brands = await this.selectWithFilterPermission(filter_payload);
    const in_page = this.countbrandsFiltered(brands);
    const pages = this.countPages(total, per_page);

    const data = this.transformResponse(brands)
    return this.findAllBrandsToResponse({
      total,
      pages,
      page,
      per_page,
      in_page,
      data,
    });
  }

  protected pagination(
    data: Omit<Data<Partial<Brand>>, 'user'>,
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

  getPage(pagination: ReturnType<FindAllBrandUseCase['pagination']>) {
    return pagination.skip;
  }

  mountFilter(
    data: Omit<Data<Partial<Brand>>, 'user'>,
    pagination: ReturnType<FindAllBrandUseCase['pagination']>,
  ) {
    delete data?.filter?.page;
    return {
      ...data?.filter,
      ...pagination,
      active: true,
      deleted: false,
    };
  }

  async selectWithFilterPermission(
    filter: ReturnType<FindAllBrandUseCase['mountFilter']>,
  ) {
    return (await this.brandService.findAll(filter)) as Brand[];
  }

  countbrandsFiltered(brand: Brand[]) {
    return brand.length;
  }

  async countAllbrands(data: Omit<Data<Partial<Brand>>, 'user'>) {
    return await this.brandService.count({
      ...data?.filter,
      active: true,
      deleted: false,
    });
  }

  countPages(total_brands: number, per_page: number) {
    return Math.floor(total_brands / per_page);
  }

  findAllBrandsToResponse(data: Pagination<Brand | any>) {
    const { total, page, per_page, in_page, pages, data: brand } = data;
    return {
      total,
      page,
      pages,
      per_page,
      in_page,
      data: brand,
    };
  }

  transformResponse(brands: Partial<Brand>[]) {
    return brands.flatMap((brand) => {
      return {
        ...brand,
        created_at: new Date(brand?.created_at).toISOString(),
      };
    });
  }
}
