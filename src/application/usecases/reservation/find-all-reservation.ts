import { Injectable } from '@nestjs/common';
import { ReservationService } from '@/application/services/reservation';
import { Reservation } from '@/domain/entities/reservation';
import { Data } from '@/domain/types/data';
import { Pagination } from '@/domain/types/pagination';

@Injectable()
export class FindAllReservationUseCase {
  constructor(private readonly reservationService: ReservationService) {}

  async execute({ ...filter }: Data<Partial<Reservation>>) {
    const per_page = this.limitPerPage();
    const pagination = this.pagination(filter, per_page);
    const filter_payload = this.mountFilter(filter, pagination);

    const total = await this.countAllReservations(filter);
    const page = this.getPage(pagination);
    const reservations = await this.selectWithFilterReservation(filter_payload);
    const in_page = this.countReservationsFiltered(reservations);
    const pages = this.countPages(total, per_page);

    const data = this.transformResponse(reservations);
    return this.findAllReservationsToResponse({
      total,
      pages,
      page,
      per_page,
      in_page,
      data: data,
    });
  }

  protected pagination(
    data: Omit<Data<Partial<Reservation>>, 'user'>,
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

  getPage(pagination: ReturnType<FindAllReservationUseCase['pagination']>) {
    return pagination.skip;
  }

  mountFilter(
    data: Omit<Data<Partial<Reservation>>, 'user'>,
    pagination: ReturnType<FindAllReservationUseCase['pagination']>,
  ) {
    delete data?.filter?.page;
    return {
      ...data.filter,
      ...pagination,
    };
  }

  async selectWithFilterReservation(
    filter: ReturnType<FindAllReservationUseCase['mountFilter']>,
  ) {
    return (await this.reservationService.findAll(filter)) as Reservation[];
  }

  countReservationsFiltered(reservation: Reservation[]) {
    return reservation.length;
  }

  async countAllReservations(data: Omit<Data<Partial<Reservation>>, 'user'>) {
    return await this.reservationService.count({
      ...data?.filter,
    });
  }

  countPages(total_reservations: number, per_page: number) {
    return Math.floor(total_reservations / per_page);
  }

  findAllReservationsToResponse(data: Pagination<Partial<Reservation | any>>) {
    const { total, page, per_page, in_page, pages, data: reservation } = data;
    return {
      total,
      page,
      pages,
      per_page,
      in_page,
      data: reservation,
    };
  }

  transformResponse(reservations: Partial<Reservation>[]) {
    return reservations.flatMap((reservation) => {
      return {
        ...reservation,
        created_at: new Date(reservation.created_at).toISOString(),
      };
    });
  }
}
