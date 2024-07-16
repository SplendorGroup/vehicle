import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { Application } from './application';
import { Infraestructure } from './infraestructure';
import { Domain } from './domain';
import { Presentation } from './presentation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    Infraestructure,
    Domain,
    Application,
    Presentation,
  ],
})
export class App {}
