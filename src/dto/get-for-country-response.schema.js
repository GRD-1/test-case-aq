import Joi from 'joi';

const SCHEMA = Joi.object({
  year: Joi.number().integer(),
  countryCode: Joi.number().integer(),
  countryName: Joi.string(),
  carbon: Joi.number(),
  score: Joi.string(),
}).options({ stripUnknown: true });

const GetForCountryRespSchema = Joi.array().items(SCHEMA);

export default GetForCountryRespSchema;
