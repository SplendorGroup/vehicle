import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CheckReservationExpiryUseCase } from '@/application/usecases/reservation/check-reservation-expiry';

@Injectable()
export class CheckReservationExpiryJob {
  constructor(
    private readonly checkReservationExpiryUseCase: CheckReservationExpiryUseCase,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    await this.checkReservationExpiryUseCase.execute();
  }
}
