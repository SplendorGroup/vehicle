import { Global, Module } from '@nestjs/common';
import { CheckReservationExpiryUseCase } from '@/application/usecases/reservation/check-reservation-expiry';
import { CancelReservationUseCase } from './cancel-reservation';
import { CreateReservationUseCase } from './create-reservation';
import { FindOneReservationUseCase } from './find-one-reservation';
import { FindAllReservationUseCase } from './find-all-reservation';

@Global()
@Module({
  providers: [
    CheckReservationExpiryUseCase,
    CancelReservationUseCase,
    CreateReservationUseCase,
    FindOneReservationUseCase,
    FindAllReservationUseCase,
  ],
  exports: [
    CheckReservationExpiryUseCase,
    CancelReservationUseCase,
    CreateReservationUseCase,
    FindOneReservationUseCase,
    FindAllReservationUseCase,
  ],
})
export class Reservation {}
