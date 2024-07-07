import { vehicle, brand, color, vehicle_color, Prisma } from '@prisma/client';

export type ModelName = 'vehicle' | 'brand' | 'color' | 'vehicle_color';

export type PrismaModels = {
  vehicle: Prisma.vehicleDelegate<any>;
  brand: Prisma.brandDelegate<any>;
  color: Prisma.colorDelegate<any>;
  vehicle_color: Prisma.$vehicle_colorPayload<any>;
};
export type ModelType<M extends keyof PrismaModels> = PrismaModels[M];

interface Data {
  vehicle: vehicle;
  brand: brand;
  color: color;
  vehicle_color: vehicle_color;
}

interface PrismaRelations {
  vehicle: {
    brand: PrismaRelations['brand'];
    colors: PrismaRelations['vehicle_color'][];
  } & vehicle;
  brand: {
    vehicle: PrismaRelations['vehicle'][];
  } & brand;
  color: {
    vehicles: PrismaRelations['vehicle_color'][];
  } & color;
  vehicle_color: {
    vehicle: PrismaRelations['vehicle'];
    color: PrismaRelations['color'];
  } & vehicle_color;
}

type PrismaRelationPayload<T extends keyof PrismaRelations> =
  PrismaRelations[T];

export type DataType<T extends keyof Data> = Data[T];

export interface IPrisma<T extends keyof Data> {
  create: (data: Partial<DataType<T>>) => Promise<DataType<T>>;
  createMany: (data: Partial<DataType<T>>[]) => Promise<DataType<T>[]>;
  findOne: (filter: Partial<DataType<T>>) => Promise<DataType<T> | null>;
  findById: (id: string) => Promise<DataType<T> | null>;
  findAll: (
    filter?: { skip?: number; take?: number } & Partial<DataType<T>>,
  ) => Promise<DataType<T>[]>;
  findByIdWithRelations: (
    id: string,
    relations: string[],
  ) => Promise<PrismaRelationPayload<T> | null>;
  findOneWithRelations: (
    relations: string[],
    filter?: {
      skip?: number;
      take?: number;
      include?: Record<string, any>;
    } & Partial<DataType<any>>,
  ) => Promise<PrismaRelationPayload<T>>;
  findAllWithRelations: (
    relations: any[],
    filter?: {
      skip?: number;
      take?: number;
      orderBy?: Record<string, string>[];
      start_date?: string;
      end_date?: string;
      include?: Record<string, any>;
    } & Partial<DataType<any>>,
  ) => Promise<PrismaRelationPayload<T>[]>;
  update: (id: string, data: Partial<DataType<T>>) => Promise<T | null>;
  updateMany: (
    filter: Partial<DataType<T>>,
    data: Partial<DataType<T>>,
  ) => Promise<T[]>;
  deleteById: (id: string) => Promise<void>;
  deleteMany: (filter: Partial<DataType<T>>) => Promise<void>;
  count: (filter: Partial<unknown>) => Promise<number | null>;
}

export interface IRepository {
  create: (data: unknown) => Promise<unknown>;
  createMany: (data: unknown[]) => Promise<any[]>;
  findOne: (filter: Partial<unknown>) => Promise<unknown | null>;
  findById: (id: string) => Promise<unknown | null>;
  findAll: (filter: Partial<unknown>) => Promise<unknown[]>;
  findOneWithRelations: (
    filter: Partial<unknown>,
    relations: string[],
  ) => Promise<unknown | null>;
  findByIdWithRelations: (
    id: string,
    relations: string[],
  ) => Promise<unknown | null>;
  findAllWithRelations: (
    relations: string[],
    filter?: Partial<any>,
  ) => Promise<any>;
  update: (id: string, data: Partial<unknown>) => Promise<unknown | null>;
  updateMany: (
    filter: Partial<unknown>,
    data: Partial<unknown>,
  ) => Promise<unknown | null>;
  deleteById: (id: string) => Promise<void>;
  deleteMany: (filter: Partial<unknown>) => Promise<void>;
  count: (filter: Partial<unknown>) => Promise<number | null>;
}
