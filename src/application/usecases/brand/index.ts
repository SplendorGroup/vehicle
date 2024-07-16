import { Global, Module } from '@nestjs/common';
import { CreateBrandUseCase } from './create-brand';
import { DeleteBrandUseCase } from './delete-brand';
import { FindOneBrandUseCase } from './findone-brand';
import { FindAllBrandUseCase } from './findall-brand';
import { UpdateBrandUseCase } from './update-brand';

@Global()
@Module({
  providers: [
    CreateBrandUseCase,
    DeleteBrandUseCase,
    FindAllBrandUseCase,
    FindOneBrandUseCase,
    UpdateBrandUseCase,
    DeleteBrandUseCase,
  ],
  exports: [
    CreateBrandUseCase,
    DeleteBrandUseCase,
    FindAllBrandUseCase,
    FindOneBrandUseCase,
    UpdateBrandUseCase,
    DeleteBrandUseCase,
  ],
})
export class Brand {}
