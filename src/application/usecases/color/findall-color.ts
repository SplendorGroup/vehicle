import { Injectable } from '@nestjs/common';
import { Color } from '@/domain/entities/color';
import { Data } from '@/domain/types/data';
import { Pagination } from '@/domain/types/pagination';
import { ColorService } from '@/application/services/color';

@Injectable()
export class FindAllColorUseCase {
  constructor(private readonly colorService: ColorService) {}

  async execute({ ...filter }: Data<Partial<Color>>) {
    console.log(filter);
    const per_page = this.limitPerPage();
    const pagination = this.pagination(filter, per_page);
    const filter_payload = this.mountFilter(filter, pagination);

    console.log(filter_payload);

    const total = await this.countAllcolors(filter);
    const page = this.getPage(pagination);
    const colors = await this.selectWithFilterPermission(filter_payload);
    const in_page = this.countcolorsFiltered(colors);
    const pages = this.countPages(total, per_page);

    const data = this.transformResponse(colors);
    return this.findAllColorsToResponse({
      total,
      pages,
      page,
      per_page,
      in_page,
      data: data,
    });
  }

  protected pagination(
    data: Omit<Data<Partial<Color>>, 'user'>,
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

  getPage(pagination: ReturnType<FindAllColorUseCase['pagination']>) {
    return pagination.skip;
  }

  mountFilter(
    data: Omit<Data<Partial<Color>>, 'user'>,
    pagination: ReturnType<FindAllColorUseCase['pagination']>,
  ) {
    delete data?.filter?.page;
    return {
      ...data.filter,
      ...pagination,
      active: true,
      deleted: false,
    };
  }

  async selectWithFilterPermission(
    filter: ReturnType<FindAllColorUseCase['mountFilter']>,
  ) {
    return (await this.colorService.findAll(filter)) as Color[];
  }

  countcolorsFiltered(color: Color[]) {
    return color.length;
  }

  async countAllcolors(data: Omit<Data<Partial<Color>>, 'user'>) {
    return await this.colorService.count({
      ...data?.filter,
      active: true,
      deleted: false,
    });
  }

  countPages(total_colors: number, per_page: number) {
    return Math.floor(total_colors / per_page);
  }

  findAllColorsToResponse(data: Pagination<Partial<Color | any>>) {
    const { total, page, per_page, in_page, pages, data: color } = data;
    return {
      total,
      page,
      pages,
      per_page,
      in_page,
      data: color,
    };
  }

  transformResponse(colors: Partial<Color>[]) {
    return colors.flatMap((color) => {
      return {
        ...color,
        created_at: new Date(color.created_at).toISOString(),
      };
    });
  }
}
