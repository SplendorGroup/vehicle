import { Inject, Injectable } from '@nestjs/common';
import { IPrisma } from '@/infraestructure/interfaces/irepository';
import { Color } from '@/domain/entities/color';

@Injectable()
export class ColorService {
  @Inject('color')
  public readonly color: IPrisma<'color'>;

  async findAll?(color: Partial<Color>): Promise<Color[]> {
    return (await this.color.findAll(color)) as unknown as Color[];
  }

  async findById(id: string): Promise<Color> {
    return (await this.color.findById(id)) as unknown as Color;
  }

  async findOne(color: Partial<Color>): Promise<Color> {
    return (await this.color.findOne(color)) as unknown as Color;
  }

  async create(color: Color): Promise<Color> {
    return (await this.color.create(color)) as unknown as Color;
  }

  async update(id: string, color: Partial<Color>): Promise<Color> {
    return (await this.color.update(id, color)) as unknown as Color;
  }

  async delete(id: string): Promise<void> {
    return await this.color.deleteById(id);
  }

  async count(color: Partial<Color>): Promise<number> {
    return await this.color.count(color);
  }
}
