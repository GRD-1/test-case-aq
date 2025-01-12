import Joi from 'joi';

const SCHEMA = Joi.object({
  countryName: Joi.string().required(),
  year: Joi.number().integer().min(1961).max(3000),
  pageFrom: Joi.number().integer().positive(),
  pageTo: Joi.number().integer().positive(),
  limit: Joi.number().integer().positive().default(10),
});

export default SCHEMA;
