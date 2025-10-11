import { Module } from '@nestjs/common';
import { ArticleModule } from './modules/article/article.module';

@Module({
  imports: [ArticleModule], // зависимости от других модулей
  controllers: [], // за связь с внешним миром и принимает интернет запросы
  providers: [], // логика работы приложения
})
export class AppModule {}
