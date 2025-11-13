import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";

@JoiSchemaOptions({})
export class SignUpDto {

  @JoiSchema(Joi.string().email().required())
  email: string;

  @JoiSchema(Joi.string().required())
  password: string;
}
