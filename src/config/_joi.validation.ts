import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  MONGO_URL: Joi.required(),
  DEFAULT_LIMIT: Joi.number().default(5),
  DEFAULT_OFFSET: Joi.number().default(0),
});
