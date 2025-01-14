import Joi from 'joi';
import { InternalError } from '../errors/errors';
import { INTERNAL_ERROR_CODES } from '../errors/error-codes';

const schema = Joi.object().pattern(
  Joi.string(),
  Joi.object({
    score: Joi.string().required(),
    countryCode: Joi.number().required(),
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
        score,
        countryCode: Number(countryCode),
        countryName,
        carbon,
      };
    }
  });

  const { error } = schema.validate(transformed);

  if (error) {
    throw new InternalError(error.message, INTERNAL_ERROR_CODES.INTERNAL_SERVER_ERROR);
  }

  return { value: transformed, error: error };
}

export default GetEmissionRespTransform;
