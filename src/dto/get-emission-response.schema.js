import Joi from 'joi';
import { InternalError } from '../errors/errors';
import { INTERNAL_ERRORS } from '../errors/error-codes';

const schema = Joi.object().pattern(
  Joi.string(),
  Joi.object({
    score: Joi.string().allow(null),
    countryCode: Joi.number().allow('all'),
    countryName: Joi.string().required(),
    carbon: Joi.number().allow(null),
  }),
);

function GetEmissionRespTransform(data) {
  const transformed = {};

  data.forEach((item) => {
    if (item.result) {
      const { score, countryCode, countryName, carbon } = item.result;
      transformed[countryName] = {
        score: score || null,
        countryCode: Number(countryCode),
        countryName,
        carbon: carbon || null,
      };
    }
  });
  const { error } = schema.validate(transformed);

  if (error) {
    const msg = `Invalid response: ${error.message}`;
    throw new InternalError({ ...INTERNAL_ERRORS.INVALID_RESPONSE, cause: msg });
  }

  return { value: transformed, error: error };
}

export default GetEmissionRespTransform;
