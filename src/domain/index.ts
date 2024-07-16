import { Global, Module } from '@nestjs/common';
import { ReservationFactory } from './factories/reservation';
import { VehicleFactory } from './factories/vehicle';
import { VehicleColorFactory } from './factories/vehicle_color';
import { ColorFactory } from './factories/color';
import { BrandFactory } from './factories/brand';

@Global()
@Module({
  providers: [
    ReservationFactory,
    VehicleFactory,
    VehicleColorFactory,
    ColorFactory,
    BrandFactory,
  ],
  exports: [
    ReservationFactory,
    VehicleFactory,
    VehicleColorFactory,
    ColorFactory,
    BrandFactory,
  ],
})
export class Domain {}
