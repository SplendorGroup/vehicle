import { Global, Module } from '@nestjs/common';
import { CreateVehicleUseCase } from './create-vehicle';
import { DeleteVehicleUseCase } from './delete-vehicle';
import { FindOneVehicleUseCase } from './findone-vehicle';
import { FindAllVehicleUseCase } from './findall-vehicle';
import { UpdateVehicleUseCase } from './update-vehicle';

@Global()
@Module({
  providers: [
    CreateVehicleUseCase,
    DeleteVehicleUseCase,
    FindAllVehicleUseCase,
    FindOneVehicleUseCase,
    UpdateVehicleUseCase,
    DeleteVehicleUseCase,
  ],
  exports: [
    CreateVehicleUseCase,
    DeleteVehicleUseCase,
    FindAllVehicleUseCase,
    FindOneVehicleUseCase,
    UpdateVehicleUseCase,
    DeleteVehicleUseCase,
  ],
})
export class Vehicle {}
