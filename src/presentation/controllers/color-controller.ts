import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateColorUseCase } from '@/application/usecases/color/create-color';
import { FindAllColorUseCase } from '@/application/usecases/color/findall-color';
import { FindOneColorUseCase } from '@/application/usecases/color/findone-color';
import { UpdateColorUseCase } from '@/application/usecases/color/update-color';
import { DeleteColorUseCase } from '@/application/usecases/color/delete-color';
import { ValidateGrpcInput } from '../../infraestructure/decorators/validate-grpc-input';
import { RequestUser } from '@/infraestructure/types/user';
import { FindAllColorDTO } from '@/application/dtos/color/findall-color';
import { FindOneColorDTO } from '@/application/dtos/color/findone-color';
import { CreateColorDTO } from '@/application/dtos/color/create-color';
import {
  UpdateColorDTO,
  UpdateColorParamsDTO,
} from '@/application/dtos/color/update-color';
import { DeleteColorDTO } from '@/application/dtos/color/delete-color';

@Controller()
export class ColorController {
  constructor(
    private readonly createColorUseCase: CreateColorUseCase,
    private readonly findAllColorUseCase: FindAllColorUseCase,
    private readonly findOneColorUseCase: FindOneColorUseCase,
    private readonly updateColorUseCase: UpdateColorUseCase,
    private readonly deleteColorUseCase: DeleteColorUseCase,
  ) {}

  @GrpcMethod('ColorService', 'FindAll')
  @ValidateGrpcInput(
    { query: FindAllColorDTO },
    {
      code: 1405,
      identify: 'BRAND_UNPROCESSABLE_CONTENT',
    },
  )
  async findAll({ query, user }) {
    return await this.findAllColorUseCase.execute({ filter: query, user });
  }

  @GrpcMethod('ColorService', 'FindOne')
  @ValidateGrpcInput(
    { params: FindOneColorDTO },
    {
      code: 1405,
      identify: 'BRAND_UNPROCESSABLE_CONTENT',
    },
  )
  async findOne({ params: { id } }: { params: FindOneColorDTO }) {
    return this.findOneColorUseCase.execute(id);
  }

  @GrpcMethod('ColorService', 'Create')
  @ValidateGrpcInput(
    { body: CreateColorDTO },
    {
      code: 1405,
      identify: 'BRAND_UNPROCESSABLE_CONTENT',
    },
  )
  async create({ body, user }: { body: CreateColorDTO; user: RequestUser }) {
    return this.createColorUseCase.execute({ body, user });
  }

  @GrpcMethod('ColorService', 'Update')
  @ValidateGrpcInput(
    { body: UpdateColorDTO, params: UpdateColorParamsDTO },
    {
      code: 1405,
      identify: 'BRAND_UNPROCESSABLE_CONTENT',
    },
  )
  async update({
    body,
    params: { id },
    user,
  }: {
    body: UpdateColorDTO;
    params: UpdateColorParamsDTO;
    user: RequestUser;
  }) {
    return await this.updateColorUseCase.execute({ id, body, user });
  }

  @GrpcMethod('ColorService', 'Delete')
  @ValidateGrpcInput(
    { params: DeleteColorDTO },
    {
      code: 1405,
      identify: 'BRAND_UNPROCESSABLE_CONTENT',
    },
  )
  async delete({
    params: { id },
    user,
  }: {
    params: DeleteColorDTO;
    user: RequestUser;
  }) {
    console.log({ id, user })
    return await this.deleteColorUseCase.execute({ id, user });
  }
}
