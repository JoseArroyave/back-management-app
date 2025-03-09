import { JwtStrategy } from "./modules/auth/strategies/jwt.strategy";
import { AuthInterceptor } from "./modules/auth/auth.interceptor";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ClassSerializerInterceptor } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { CORS } from "./common/constants/cors";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  const jwtStrategy = app.get(JwtStrategy);
  const reflector = app.get(Reflector);

  /* Global items */
  app.useGlobalInterceptors(new AuthInterceptor(reflector, jwtStrategy));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.setGlobalPrefix("api");

  /* CORS */
  app.enableCors(CORS);

  /* Swagger */
  const config = new DocumentBuilder().addBearerAuth().setTitle("API Documentation").setVersion("1.0").build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(+process.env.PORT);
  console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
