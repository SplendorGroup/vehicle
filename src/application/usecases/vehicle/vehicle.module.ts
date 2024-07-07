import { Module } from '@nestjs/common';
import { CreateVehicleUseCase } from './create-vehicle';
import { DeleteVehicleUseCase } from './delete-vehicle';
import { FindOneVehicleUseCase } from './findone-vehicle';
import { FindAllVehicleUseCase } from './findall-vehicle';
import { UpdateVehicleUseCase } from './update-vehicle';
import { VehicleController } from '@/presentation/controllers/vehicle-controller';

@Module({
  controllers: [VehicleController],
  providers: [
    CreateVehicleUseCase,
    DeleteVehicleUseCase,
    FindAllVehicleUseCase,
    FindOneVehicleUseCase,
    UpdateVehicleUseCase,
    DeleteVehicleUseCase,
  ],
})
export class VehicleModule {}
