import { Injectable } from '@nestjs/common';
import { DataMount } from '@/domain/types/data';
import { RequestUser } from '@/domain/types/user';
import { RpcException } from '@nestjs/microservices';
import { ColorFactory } from '@/domain/factories/color';
import { ColorService } from '@/application/services/color';
import { ColorMapper } from '@/domain/mappers/color';
import { Color } from '@/domain/entities/color';

@Injectable()
export class CreateColorUseCase {
  constructor(
    private readonly colorService: ColorService,
    private readonly colorFactory: ColorFactory,
  ) {}

  async execute({ body: data, user }: DataMount<Partial<Color>>) {
    const color = await this.getColorByName(data.name);
    this.checkIfTheColorExists(color);
    const createdColor = await this.createColor(data, user);
    return this.transformResponse(createdColor);
  }

  async createColor(data: Partial<ColorMapper>, user: RequestUser) {
    try {
      const colorDomain = this.colorFactory.create(data);
      return await this.colorService.create(colorDomain);
    } catch {
      throw new RpcException({
        code: 1402,
        details: JSON.stringify({
          name: 'Color Creation Failed',
          identify: 'COLOR_CREATION_FAILED',
          status: 500,
          message: 'Failed to create color.',
        }),
      });
    }
  }

  async getColorByName(name: string) {
    return await this.colorService.findOne({ name });
  }

  checkIfTheColorExists(color: any) {
    if (color) {
      throw new RpcException({
        code: 1401,
        details: JSON.stringify({
          name: 'Color Already Exists',
          identify: 'COLOR_ALREADY_EXISTS',
          status: 409,
          message: 'The color already exists.',
        }),
      });
    }
  }

  transformResponse(color: any) {
    return ColorMapper.toResponse(color);
  }
}
