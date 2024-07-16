import { Global, Module } from '@nestjs/common';
import { CreateColorUseCase } from './create-color';
import { DeleteColorUseCase } from './delete-color';
import { FindOneColorUseCase } from './findone-color';
import { FindAllColorUseCase } from './findall-color';
import { UpdateColorUseCase } from './update-color';

@Global()
@Module({
  providers: [
    CreateColorUseCase,
    DeleteColorUseCase,
    FindAllColorUseCase,
    FindOneColorUseCase,
    UpdateColorUseCase,
    DeleteColorUseCase,
  ],
  exports: [
    CreateColorUseCase,
    DeleteColorUseCase,
    FindAllColorUseCase,
    FindOneColorUseCase,
    UpdateColorUseCase,
    DeleteColorUseCase,
  ],
})
export class Color {}
