import { Injectable } from '@nestjs/common';
import { Color } from '@/domain/entities/color';
import { ColorMapper } from '@/domain/mappers/color';

@Injectable()
export class ColorFactory {
  create(data: any): any {
    const colorDomain = ColorMapper.toDomain(data);
    const color = new Color(colorDomain);
    return ColorMapper.toPersistence(color);
  }
}
