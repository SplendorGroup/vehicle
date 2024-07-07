import { Injectable } from '@nestjs/common';
import { Color } from '@/domain/entities/color';
import { DataMount } from '@/infraestructure/types/data';
import { RequestUser } from '@/infraestructure/types/user';
import { ColorService } from '@/infraestructure/services/color';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CreateColorUseCase {
  constructor(private readonly colorService: ColorService) {}

  async execute({ body: data, user }: DataMount<Partial<Color>>) {
    const color = await this.getColorByName(data.name);
    this.checkIfTheColorExists(color);
    const data_response = await this.createColor(data, user);
    return this.transformResponse(data_response);
  }

  async createColor(data: Partial<Color>, user: RequestUser) {
    try {
      const color = new Color({
        ...data,
        created_by: user?.id ?? 'admin',
      });
      return await this.colorService.create(color);
    } catch {
      throw new RpcException({
        code: 1402,
        details: JSON.stringify({
          name: 'Color Creation Failed',
          identify: 'BRAND_CREATION_FAILED',
          status: 500,
          message: 'Failed to create color.',
        }),
      });
    }
  }

  async getColorByName(name: string) {
    return await this.colorService.findOne({ name });
  }

  checkIfTheColorExists(color: Color) {
    if (color) {
      throw new RpcException({
        code: 1401,
        details: JSON.stringify({
          name: 'Color Already Exists',
          identify: 'BRAND_ALREADY_EXISTS',
          status: 409,
          message: 'The color already exists.',
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
