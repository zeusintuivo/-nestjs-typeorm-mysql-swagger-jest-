import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// - start Validation block linked to TypeStack using  npm i --save class-validator class-transformer
import { Logger, ValidationPipe } from '@nestjs/common';
// - end Validation block linked to TypeStack using  npm i --save class-validator class-transformer

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  // - start Validation block linked to TypeStack using  npm i --save class-validator class-transformer
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );
  // - end Validation block linked to TypeStack using  npm i --save class-validator class-transformer
  await app.listen(3000);
  logger.log(`Server is running in ${await app.getUrl()}`)
}
bootstrap();
