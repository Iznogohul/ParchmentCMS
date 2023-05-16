import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('Posts Creation')
    .setDescription('OpenAPI specification for Posts')
    .setVersion('1.0')
    .setContact(
      'Nikolaos Grigoropoulos',
      'https://www.github.com/Iznogohul',
      'nikos.gr.17@gmail.com',
    )
    .addServer('/', 'Access to Swagger API calls')
    .addServer('/proxy', 'Access to Swagger API calls behind proxy')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.use(compression());

  const port = process.env.PORT || '3000';

  if (port === '3000' && process.env.PORT === '') {
    console.warn(
      `No port specified in environment variables. Using default port ${port}.`,
    );
  }
  await app.listen(port);
}
bootstrap();
