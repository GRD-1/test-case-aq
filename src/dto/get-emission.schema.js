import Joi from 'joi';

const GetEmissionSchema = Joi.object({
  year: Joi.number().integer().min(1960).max(3000).required(),
  pageFrom: Joi.number().integer().positive(),
  pageTo: Joi.number().integer().positive(),
  recordsPerPage: Joi.number().integer().positive().default(10),
});

export default GetEmissionSchema;
