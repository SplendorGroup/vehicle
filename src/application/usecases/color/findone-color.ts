import { Injectable } from '@nestjs/common';
import { ColorService } from '@/infraestructure/services/color';
import { Color } from '@/domain/entities/color';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class FindOneColorUseCase {
  constructor(private readonly colorService: ColorService) {}

  async execute(id: string) {
    const color = await this.getColorById(id);
    this.checkIfTheColorIsFound(color);

    const data = this.transformResponse(color)
    return data;
  }

  async getColorById(id: string) {
    return await this.colorService.findById(id);
  }

  checkIfTheColorIsFound(color: Color) {
    if (!color) {
      throw new RpcException({
        code: 1400,
        details: JSON.stringify({
          name: 'Color Not Found',
          identify: 'BRAND_NOT_FOUND',
          status: 404,
          message: 'The specified color could not be found.',
        }),
      });
    }
  }

  transformResponse(color: Partial<Color>) {
      return {
        ...color,
        created_at: new Date(color.created_at).toISOString(),
      };
  }
}
