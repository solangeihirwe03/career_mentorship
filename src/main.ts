import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { AppModule } from "./app.module";
import { config } from "dotenv";

config();

const bootstrap = async()=>{
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: false
    }
  );
  await app.register(require('@fastify/cors'), {
    origin: "*"
  });
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Server is listening on port ${port}`);
}

bootstrap();