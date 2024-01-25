import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost) 
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
 
  app.enableCors()
  app.setGlobalPrefix('api')
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
    event: any,
    context: Context,
    callback: Callback,
  ) => {
    server = server ?? (await bootstrap());
    return server(event, context, callback);
  };