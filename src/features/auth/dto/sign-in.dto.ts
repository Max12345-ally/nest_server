import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";

@JoiSchemaOptions({})
export class SignInDto {

  @JoiSchema(Joi.string().email().required())
  email: string;

  @JoiSchema(Joi.string().required())
  password: string;
}
