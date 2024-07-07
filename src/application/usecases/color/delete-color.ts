import { Injectable } from '@nestjs/common';
import { Color } from '@/domain/entities/color';
import { ColorService } from '@/infraestructure/services/color';
import { DataChangeById } from '@/infraestructure/types/data';
import { RequestUser } from '@/infraestructure/types/user';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class DeleteColorUseCase {
  constructor(private readonly colorService: ColorService) {}

  async execute({ id, user }: DataChangeById) {
    const color = await this.getColor(id);
    console.log(color)
    this.checkIfTheColorIsFound(color);
    await this.deleteColor(id, user);
    return {}
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

  async deleteColor(id: string, user: RequestUser) {
    try {
      return await this.colorService.update(id, {
        deleted: true,
        active: false,
        deleted_at: new Date(),
        deleted_by: user?.id ?? 'admin',
      });
    } catch {
      throw new RpcException({
        code: 1404,
        details: JSON.stringify({
          name: 'Color Deletion Failed',
          identify: 'BRAND_DELETION_FAILED',
          status: 500,
          message: 'Failed to delete color.',
        }),
      });
    }
  }
}
