import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './article.schema';
import { Model } from 'mongoose';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private readonly _articleModel: Model<ArticleDocument>,
  ) {}

  create(createArticleDto: CreateArticleDto) {
    const createdArticle = new this._articleModel(createArticleDto);
    return createdArticle.save();
	}
  
  getAll() {
		return this._articleModel.find();
  }

  deleteById(id: string) {
    return this._articleModel.findByIdAndDelete(id)
  }

  updateById(id: string, updateArticleDto: UpdateArticleDto) {
    return this._articleModel.findByIdAndUpdate(id, updateArticleDto, {new: true})
  }
}
