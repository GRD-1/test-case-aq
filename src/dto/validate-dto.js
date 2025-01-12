import { INTERNAL_ERROR_CODES } from '../errors/error-codes';
import { InternalError } from '../errors/errors';

export default function validateDTO(schema, dto) {
  const { value, error } = schema.validate(dto);
  if (error) {
    throw new InternalError(error.details[0].message, INTERNAL_ERROR_CODES.BAD_REQUEST);
  }

  return value;
}
