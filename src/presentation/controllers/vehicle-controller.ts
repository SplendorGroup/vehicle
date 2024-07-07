import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateVehicleUseCase } from '@/application/usecases/vehicle/create-vehicle';
import { FindAllVehicleUseCase } from '@/application/usecases/vehicle/findall-vehicle';
import { FindOneVehicleUseCase } from '@/application/usecases/vehicle/findone-vehicle';
import { UpdateVehicleUseCase } from '@/application/usecases/vehicle/update-vehicle';
import { DeleteVehicleUseCase } from '@/application/usecases/vehicle/delete-vehicle';
import { FindAllVehicleDTO } from '@/application/dtos/vehicle/findall-vehicle';
import { ValidateGrpcInput } from '../../infraestructure/decorators/validate-grpc-input';
import { FindOneVehicleDTO } from '@/application/dtos/vehicle/findone-vehicle';
import { CreateVehicleDTO } from '@/application/dtos/vehicle/create-vehicle';
import {
  UpdateVehicleDTO,
  UpdateVehicleParamsDTO,
} from '@/application/dtos/vehicle/update-vehicle';
import { RequestUser } from '@/infraestructure/types/user';
import { DeleteVehicleDTO } from '@/application/dtos/vehicle/delete-vehicle';

@Controller()
export class VehicleController {
  constructor(
    private readonly createVehicleUseCase: CreateVehicleUseCase,
    private readonly findAllVehicleUseCase: FindAllVehicleUseCase,
    private readonly findOneVehicleUseCase: FindOneVehicleUseCase,
    private readonly updateVehicleUseCase: UpdateVehicleUseCase,
    private readonly deleteVehicleUseCase: DeleteVehicleUseCase,
  ) {}

  @GrpcMethod('VehicleService', 'FindAll')
  @ValidateGrpcInput(
    { query: FindAllVehicleDTO },
    {
      code: 1305,
      identify: 'VEHICLE_UNPROCESSABLE_CONTENT',
    },
  )
  async findAll({ query, user }) {
    console.log(query)
    return await this.findAllVehicleUseCase.execute({ filter: query, user });
  }

  @GrpcMethod('VehicleService', 'FindOne')
  @ValidateGrpcInput(
    { params: FindOneVehicleDTO },
    {
      code: 1305,
      identify: 'VEHICLE_UNPROCESSABLE_CONTENT',
    },
  )
  async findOne({ params: { id } }: { params: FindOneVehicleDTO }) {
    return this.findOneVehicleUseCase.execute(id);
  }

  @GrpcMethod('VehicleService', 'Create')
  @ValidateGrpcInput(
    { body: CreateVehicleDTO },
    {
      code: 1305,
      identify: 'VEHICLE_UNPROCESSABLE_CONTENT',
    },
  )
  async create({ body, user }: { body: CreateVehicleDTO; user: RequestUser }) {
    return this.createVehicleUseCase.execute({ body, user });
  }

  @GrpcMethod('VehicleService', 'Update')
  @ValidateGrpcInput({ body: UpdateVehicleDTO, params: UpdateVehicleParamsDTO })
  async update({
    body,
    params: { id },
    user,
  }: {
    body: UpdateVehicleDTO;
    params: UpdateVehicleParamsDTO;
    user: RequestUser;
  }) {
    return await this.updateVehicleUseCase.execute({ id, body, user });
  }

  @GrpcMethod('VehicleService', 'Delete')
  @ValidateGrpcInput(
    { params: DeleteVehicleDTO },
    {
      code: 1305,
      identify: 'VEHICLE_UNPROCESSABLE_CONTENT',
    },
  )
  async delete({
    params: { id },
    user,
  }: {
    params: DeleteVehicleDTO;
    user: RequestUser;
  }) {
    return await this.deleteVehicleUseCase.execute({ id, user });
  }
}
