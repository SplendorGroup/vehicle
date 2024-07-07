import { Module } from '@nestjs/common';
import { CreateColorUseCase } from './create-color';
import { DeleteColorUseCase } from './delete-color';
import { FindOneColorUseCase } from './findone-color';
import { FindAllColorUseCase } from './findall-color';
import { UpdateColorUseCase } from './update-color';
import { ColorController } from '@/presentation/controllers/color-controller';

@Module({
  controllers: [ColorController],
  providers: [
    CreateColorUseCase,
    DeleteColorUseCase,
    FindAllColorUseCase,
    FindOneColorUseCase,
    UpdateColorUseCase,
    DeleteColorUseCase,
  ],
})
export class ColorModule {}
