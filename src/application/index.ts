import { Global, Module } from '@nestjs/common';
import { Vehicle } from './usecases/vehicle';
import { Brand } from './usecases/brand';
import { BrandService } from './services/brand';
import { ReservationService } from './services/reservation';
import { VehicleService } from './services/vehicle';
import { ColorService } from './services/color';
import { VehicleColorService } from './services/vehicle-color';
import { Color } from './usecases/color';
import { Reservation } from './usecases/reservation';

@Global()
@Module({
  imports: [Vehicle, Color, Brand, Reservation],
  providers: [
    BrandService,
    VehicleService,
    ColorService,
    VehicleColorService,
    ReservationService,
  ],
  exports: [
    BrandService,
    VehicleService,
    ColorService,
    VehicleColorService,
    ReservationService,
  ],
})
export class Application {}
