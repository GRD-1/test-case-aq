import Joi from 'joi';

const SCHEMA = Joi.object({
  countryCode: Joi.number().required(),
  year: Joi.number().integer().min(1960).max(3000),
  pageFrom: Joi.number().integer().positive(),
  pageTo: Joi.number().integer().positive(),
  recordsPerPage: Joi.number().integer().positive().default(10),
});

export default SCHEMA;
