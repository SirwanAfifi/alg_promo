import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seeder } from './utils/seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const shouldSeedDB = process.argv.length > 2 && process.argv[2] === 'seed';
  if (shouldSeedDB)
    seeder(app).then(() => {
      console.log('Done with Seeding');
    });
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
