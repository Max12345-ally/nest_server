import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly _articlesService: ArticlesService) {}

  @Get() // функция декоратор через @ нужна для обёртки другой функции(это TS) и добавлению доп функциональности
  getAll() {
   return this._articlesService.getAll();
  }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this._articlesService.create(createArticleDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this._articlesService.deleteById(id);
  }

  @Put(':id')
  updateById(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto
  ) {
    return this._articlesService.updateById(id, updateArticleDto);
  }
  
}
