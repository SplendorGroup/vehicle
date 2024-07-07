import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Repository } from './repositories/repository';
import { MongodbConnection } from './connections/prisma';
import { VehicleService } from './services/vehicle';
import { BrandService } from './services/brand';
import { ColorService } from './services/color';
import { VehicleColorService } from './services/vehicle-color';

const entities = ['vehicle', 'brand', 'color', 'vehicle_color'];

@Global()
@Module({
  providers: [
    MongodbConnection,
    PrismaClient,
    ...entities.map((entity) => ({
      provide: entity,
      useFactory: (prisma: PrismaClient) => {
        return new Repository(prisma, entity);
      },
      inject: [PrismaClient],
    })),
    VehicleService,
    BrandService,
    ColorService,
    VehicleColorService,
  ],
  exports: [
    MongodbConnection,
    PrismaClient,
    ...entities.map((entity) => ({
      provide: entity,
      useFactory: (prisma: PrismaClient) => {
        return new Repository(prisma, entity);
      },
      inject: [PrismaClient],
    })),
    VehicleService,
    BrandService,
    ColorService,
    VehicleColorService,
  ],
})
export class InfraModule {}
