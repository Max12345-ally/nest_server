import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  private _articles: string[] = ['Статья 1']; //  это как мини база данных в ней хранятся данные

  getArticles(): string[] {
    return this._articles;
  }

  createArticle(createArticleDto?: CreateArticleDto): string[] {
    if (!createArticleDto) {
      throw new ForbiddenException('Необходимо передать тело запроса');
    }

    if (!('text' in createArticleDto)) {
      throw new ForbiddenException('Свойство text не передано в теле запроса');
    }

    if (typeof createArticleDto.text !== 'string') {
      throw new ForbiddenException('Тип text должен быть указан строкой!!!');
    }

    this._articles.push(createArticleDto.text);

    return this._articles;
  }

  deleteAll(): string[] {
    this._articles = [];

    return this._articles;
  }
}
