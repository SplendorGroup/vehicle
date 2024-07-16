import { Global, Module } from '@nestjs/common';
import { BrandController } from './controllers/brand';
import { ColorController } from './controllers/color';
import { VehicleController } from './controllers/vehicle';
import { ReservationController } from './controllers/reservation';

@Global()
@Module({
  controllers: [BrandController, ColorController, VehicleController, ReservationController],
})
export class Presentation {}
