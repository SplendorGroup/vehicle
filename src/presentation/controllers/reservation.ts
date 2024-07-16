import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateReservationUseCase } from '@/application/usecases/reservation/create-reservation';
import { CancelReservationUseCase } from '@/application/usecases/reservation/cancel-reservation';
import { FindOneReservationUseCase } from '@/application/usecases/reservation/find-one-reservation';
import { FindAllReservationUseCase } from '@/application/usecases/reservation/find-all-reservation';
import { RequestUser } from '@/domain/types/user';
import { CreateReservationDTO } from '@/application/dtos/reservation/create-reservation';
import { CancelReservationDTO } from '@/application/dtos/reservation/cancel-reservation';
import { FindOneReservationDTO } from '@/application/dtos/reservation/find-one-reservation';
import { FindAllReservationDTO } from '@/application/dtos/reservation/find-all-reservation';
import { ValidateGrpcInput } from '@/infraestructure/decorators/validate-grpc-input';

@Controller()
export class ReservationController {
  constructor(
    private readonly createReservationUseCase: CreateReservationUseCase,
    private readonly cancelReservationUseCase: CancelReservationUseCase,
    private readonly findOneReservationUseCase: FindOneReservationUseCase,
    private readonly findAllReservationUseCase: FindAllReservationUseCase,
  ) {}

  @GrpcMethod('ReservationService', 'FindAll')
  @ValidateGrpcInput(
    { query: FindAllReservationDTO },
    {
      code: 2203,
      identify: 'RESERVATION_UNPROCESSABLE_CONTENT',
    },
  )
  async findAll({ query, user }) {
    return await this.findAllReservationUseCase.execute({
      filter: query,
      user,
    });
  }

  @GrpcMethod('ReservationService', 'FindOne')
  @ValidateGrpcInput(
    { params: FindOneReservationDTO },
    {
      code: 2202,
      identify: 'RESERVATION_UNPROCESSABLE_CONTENT',
    },
  )
  async findOne({ params: { id } }: { params: FindOneReservationDTO }) {
    return this.findOneReservationUseCase.execute(id);
  }

  @GrpcMethod('ReservationService', 'Create')
  @ValidateGrpcInput(
    { body: CreateReservationDTO },
    {
      code: 2200,
      identify: 'RESERVATION_UNPROCESSABLE_CONTENT',
    },
  )
  async create({
    body,
    user,
  }: {
    body: CreateReservationDTO;
    user: RequestUser;
  }) {
    return this.createReservationUseCase.execute({ body, user });
  }

  @GrpcMethod('ReservationService', 'Cancel')
  @ValidateGrpcInput(
    { body: CancelReservationDTO },
    {
      code: 2201,
      identify: 'RESERVATION_UNPROCESSABLE_CONTENT',
    },
  )
  async cancel({
    body,
    user,
  }: {
    body: CancelReservationDTO;
    user: RequestUser;
  }) {
    return await this.cancelReservationUseCase.execute(body.id);
  }
}
