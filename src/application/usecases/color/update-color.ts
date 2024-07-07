import { Injectable } from '@nestjs/common';
import { Color } from '@/domain/entities/color';
import { ColorService } from '@/infraestructure/services/color';
import { DataChange } from '@/infraestructure/types/data';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UpdateColorUseCase {
  constructor(private readonly colorService: ColorService) {}

  async execute({ id, body: data }: DataChange<Partial<Color>>) {
    const color = await this.getColor(id);
    this.checkIfTheColorIsFound(color);
    
    const data_response = await this.updateColor(id, data);
    return this.transformResponse(data_response);
  }

  async getColor(id: string) {
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

  async updateColor(id: string, data: Partial<Color>) {
    try {
      const color = new Color(data, { update: true });
      return await this.colorService.update(id, color);
    } catch {
      throw new RpcException({
        code: 1403,
        details: JSON.stringify({
          name: 'Color Update Failed',
          identify: 'BRAND_UPDATE_FAILED',
          status: 500,
          message: 'Failed to update color.',
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
