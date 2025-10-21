import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import type { CreateArticleDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly _articlesService: ArticlesService) {}

  @Get() // функция декоратор через @ нужна для обёртки другой функции(это TS) и добавлению доп функциональности
  getArticles() {
    return this._articlesService.getArticles();
  }

  @Post()
  createArticle(@Body() createArticleDto?: CreateArticleDto) {
    return this._articlesService.createArticle(createArticleDto);
  }

  //deleteAll
}
