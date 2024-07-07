import { Module } from '@nestjs/common';
import { CreateBrandUseCase } from './create-brand';
import { DeleteBrandUseCase } from './delete-brand';
import { FindOneBrandUseCase } from './findone-brand';
import { FindAllBrandUseCase } from './findall-brand';
import { UpdateBrandUseCase } from './update-brand';
import { BrandController } from '@/presentation/controllers/brand-controller';

@Module({
  controllers: [BrandController],
  providers: [
    CreateBrandUseCase,
    DeleteBrandUseCase,
    FindAllBrandUseCase,
    FindOneBrandUseCase,
    UpdateBrandUseCase,
    DeleteBrandUseCase,
  ],
})
export class BrandModule {}
