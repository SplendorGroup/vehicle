import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Repository } from './repositories/repository';
import { MongodbConnection } from './connections/prisma';
import { models } from './config/models';

@Global()
@Module({
  providers: [
    MongodbConnection,
    PrismaClient,
    ...models.map((entity) => ({
      provide: entity,
      useFactory: (prisma: PrismaClient) => {
        return new Repository(prisma, entity);
      },
      inject: [PrismaClient],
    })),
  ],
  exports: [
    MongodbConnection,
    PrismaClient,
    ...models.map((entity) => ({
      provide: entity,
      useFactory: (prisma: PrismaClient) => {
        return new Repository(prisma, entity);
      },
      inject: [PrismaClient],
    })),
  ],
})
export class Infraestructure {}
