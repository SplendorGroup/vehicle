import { Injectable } from '@nestjs/common';
import { DataChange } from '@/domain/types/data';
import { RpcException } from '@nestjs/microservices';
import { ColorFactory } from '@/domain/factories/color';
import { ColorService } from '@/application/services/color';
import { Color } from '@/domain/entities/color';
import { ColorMapper } from '@/domain/mappers/color';

@Injectable()
export class UpdateColorUseCase {
  constructor(
    private readonly colorService: ColorService,
    private readonly colorFactory: ColorFactory,
  ) {}

  async execute({ id, body: data }: DataChange<Partial<Color>>) {
    const color = await this.getColor(id);
    this.checkIfTheColorIsFound(color);
    const updatedColor = await this.updateColor(id, data);
    return this.transformResponse(updatedColor);
  }

  async getColor(id: string) {
    return await this.colorService.findById(id);
  }

  checkIfTheColorIsFound(color: any) {
    if (!color) {
      throw new RpcException({
        code: 1400,
        details: JSON.stringify({
          name: 'Color Not Found',
          identify: 'COLOR_NOT_FOUND',
          status: 404,
          message: 'The specified color could not be found.',
        }),
      });
    }
  }

  async updateColor(id: string, data: Partial<Color>) {
    try {
      const colorDomain = this.colorFactory.create({ ...data, id });
      return await this.colorService.update(id, colorDomain);
    } catch {
      throw new RpcException({
        code: 1403,
        details: JSON.stringify({
          name: 'Color Update Failed',
          identify: 'COLOR_UPDATE_FAILED',
          status: 500,
          message: 'Failed to update color.',
        }),
      });
    }
  }

  transformResponse(color: any) {
    return ColorMapper.toResponse(color);
  }
}
