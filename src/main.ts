import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDocument } from './docs/swagger';
import { ValidationExceptionFilter } from './pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ValidationExceptionFilter());
  createDocument(app);
  await app.listen(4000);
}
bootstrap();
