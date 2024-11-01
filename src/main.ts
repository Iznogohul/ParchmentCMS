import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import compression from "compression";

import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle("Posts Creation")
    .setDescription("OpenAPI specification for Posts")
    .setVersion("1.0")
    .setContact("Nikolaos Grigoropoulos", "https://www.github.com/Iznogohul", "nikos.gr.17@gmail.com")
    .addServer("/", "Access to Swagger API calls")
    .addServer("/proxy", "Access to Swagger API calls behind proxy")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);
  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const port = process.env.PORT || "3000";

  if (port === "3000" && process.env.PORT === "") {
    console.warn(`No port specified in environment variables. Using default port ${port}.`);
  }
  await app.listen(port);
}
bootstrap().catch(err => {
  console.error("Failed to bootstrap the CMS", err);
});
