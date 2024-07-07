import { Module } from '@nestjs/common';
import { InfraModule } from './infraestructure/infra.module';
import { ConfigModule } from '@nestjs/config';
import { VehicleModule } from '@/application/usecases/vehicle/vehicle.module';
import { BrandModule } from '@/application/usecases/brand/brand.module';
import { ColorModule } from '@/application/usecases/color/color.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    InfraModule,
    VehicleModule,
    BrandModule,
    ColorModule,
  ],
})
export class AppModule {}
