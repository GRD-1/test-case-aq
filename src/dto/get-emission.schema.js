import Joi from 'joi';

const GetEmissionSchema = Joi.object({
  year: Joi.number().integer().min(1960).max(3000).required(),
});

export default GetEmissionSchema;
