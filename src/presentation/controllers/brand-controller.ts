import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateBrandUseCase } from '@/application/usecases/brand/create-brand';
import { FindAllBrandUseCase } from '@/application/usecases/brand/findall-brand';
import { FindOneBrandUseCase } from '@/application/usecases/brand/findone-brand';
import { UpdateBrandUseCase } from '@/application/usecases/brand/update-brand';
import { DeleteBrandUseCase } from '@/application/usecases/brand/delete-brand';
import { ValidateGrpcInput } from '../../infraestructure/decorators/validate-grpc-input';
import { RequestUser } from '@/infraestructure/types/user';
import { FindAllBrandDTO } from '@/application/dtos/brand/findall-brand';
import { FindOneBrandDTO } from '@/application/dtos/brand/findone-brand';
import { CreateBrandDTO } from '@/application/dtos/brand/create-brand';
import {
  UpdateBrandDTO,
  UpdateBrandParamsDTO,
} from '@/application/dtos/brand/update-brand';
import { DeleteBrandDTO } from '@/application/dtos/brand/delete-brand';

@Controller()
export class BrandController {
  constructor(
    private readonly createBrandUseCase: CreateBrandUseCase,
    private readonly findAllBrandUseCase: FindAllBrandUseCase,
    private readonly findOneBrandUseCase: FindOneBrandUseCase,
    private readonly updateBrandUseCase: UpdateBrandUseCase,
    private readonly deleteBrandUseCase: DeleteBrandUseCase,
  ) {}

  @GrpcMethod('BrandService', 'FindAll')
  @ValidateGrpcInput(
    { query: FindAllBrandDTO },
    {
      code: 1405,
      identify: 'BRAND_UNPROCESSABLE_CONTENT',
    },
  )
  async findAll({ query }) {
    return await this.findAllBrandUseCase.execute(query);
  }

  @GrpcMethod('BrandService', 'FindOne')
  @ValidateGrpcInput(
    { params: FindOneBrandDTO },
    {
      code: 1405,
      identify: 'BRAND_UNPROCESSABLE_CONTENT',
    },
  )
  async findOne({ params: { id } }: { params: FindOneBrandDTO }) {
    return this.findOneBrandUseCase.execute(id);
  }

  @GrpcMethod('BrandService', 'Create')
  @ValidateGrpcInput(
    { body: CreateBrandDTO },
    {
      code: 1405,
      identify: 'BRAND_UNPROCESSABLE_CONTENT',
    },
  )
  async create({ body, user }: { body: CreateBrandDTO; user: RequestUser }) {
    return this.createBrandUseCase.execute({ body, user });
  }

  @GrpcMethod('BrandService', 'Update')
  @ValidateGrpcInput(
    { body: UpdateBrandDTO, params: UpdateBrandParamsDTO },
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
    body: UpdateBrandDTO;
    params: UpdateBrandParamsDTO;
    user: RequestUser;
  }) {
    return await this.updateBrandUseCase.execute({ id, body, user });
  }

  @GrpcMethod('BrandService', 'Delete')
  @ValidateGrpcInput(
    { params: DeleteBrandDTO },
    {
      code: 1405,
      identify: 'BRAND_UNPROCESSABLE_CONTENT',
    },
  )
  async delete({
    params: { id },
    user,
  }: {
    params: DeleteBrandDTO;
    user: RequestUser;
  }) {
    return await this.deleteBrandUseCase.execute({ id, user });
  }
}
