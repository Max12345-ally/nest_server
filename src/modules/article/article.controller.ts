import { Controller, Get } from '@nestjs/common';

@Controller('articles')
export class ArticleController {
  @Get()
  getArticles() {
    return ['1234'];
  }
}
