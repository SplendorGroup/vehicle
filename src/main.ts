import { NestFactory, PartialGraphHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { resolve } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { writeFileSync } from 'node:fs';
import { Logger } from '@nestjs/common';
import * as grpc from '@grpc/grpc-js';

const logger = new Logger(bootstrap.name);

async function bootstrap() {
  process.env.TZ = 'UTC';
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    forceCloseConnections: true,
    abortOnError: false,
  });

  const config_service = app.get(ConfigService);
  app.enableShutdownHooks();

  const VEHICLE_SERVICE_PORT = Number(
    config_service.get('VEHICLE_SERVICE_PORT'),
  );
  const BRAND_SERVICE_PORT = Number(config_service.get('BRAND_SERVICE_PORT'));
  const COLOR_SERVICE_PORT = Number(config_service.get('COLOR_SERVICE_PORT'));

  console.log({
    VEHICLE_SERVICE_PORT,
    BRAND_SERVICE_PORT,
    COLOR_SERVICE_PORT,
  });

  const credentials = grpc.ServerCredentials.createSsl(
    Buffer.from(process.env.TLS_CA, 'utf8'),
    [
      {
        cert_chain: Buffer.from(process.env.TLS_CERT, 'utf8'),
        private_key: Buffer.from(process.env.TLS_KEY, 'utf8'),
      },
    ],
    true,
  );

  const TLS_ENABLE = credentials._isSecure();

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'vehicle',
      protoPath: resolve('src/infraestructure/proto/vehicle.proto'),
      url: `0.0.0.0:${VEHICLE_SERVICE_PORT}`,
      gracefulShutdown: true,
      credentials,
      loader: {
        keepCase: true,
        defaults: true,
        json: true,
        arrays: true,
      },
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'brand',
      protoPath: resolve('src/infraestructure/proto/brand.proto'),
      url: `0.0.0.0:${BRAND_SERVICE_PORT}`,
      gracefulShutdown: true,
      credentials,
      loader: {
        keepCase: true,
        defaults: true,
        json: true,
        arrays: true,
      },
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'color',
      protoPath: resolve('src/infraestructure/proto/color.proto'),
      url: `0.0.0.0:${COLOR_SERVICE_PORT}`,
      gracefulShutdown: true,
      credentials,
      loader: {
        keepCase: true,
        defaults: true,
        json: true,
        arrays: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.init();

  async function gracefulShutdown(signal: NodeJS.Signals) {
    await app.close();
    process.kill(process.pid, signal);
  }

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);

  return {
    VEHICLE_SERVICE_PORT,
    BRAND_SERVICE_PORT,
    COLOR_SERVICE_PORT,
    TLS_ENABLE,
  };
}
bootstrap()
  .then(
    ({
      VEHICLE_SERVICE_PORT,
      BRAND_SERVICE_PORT,
      COLOR_SERVICE_PORT,
      TLS_ENABLE,
    }) => {
      logger.log(
        `\nRUNNING ALL GRPC PORTS\n
[VEHICLE] ${VEHICLE_SERVICE_PORT}
[BRAND] ${BRAND_SERVICE_PORT}
[COLOR] ${COLOR_SERVICE_PORT}
[TLS] ${TLS_ENABLE ? 'TRUE' : 'FALSE'}
       `,
      );
    },
  )
  .catch((err) => {
    console.error(err);
    writeFileSync('graph.json', PartialGraphHost.toString() ?? '');
    process.exit(1);
  });
