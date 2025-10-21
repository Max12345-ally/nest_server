import { Module } from '@nestjs/common';
import { ArticlesModule } from './modules/articles/articles.module';

@Module({
  imports: [ArticlesModule], // зависимости от других модулей
  controllers: [], // за связь с внешним миром и принимает интернет запросы
  providers: [], // логика работы приложения
})
export class AppModule {}
