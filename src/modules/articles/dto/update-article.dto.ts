import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";

@JoiSchemaOptions({})
export class UpdateArticleDto {

  @JoiSchema(Joi.string().required())
  title: string;

  @JoiSchema(Joi.string().required())
  description: string;
}
