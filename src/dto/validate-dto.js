import { INTERNAL_ERRORS } from '../errors/error-codes';
import { InternalError } from '../errors/errors';

export default function validateDTO(schema, dto) {
  const { value, error } = schema.validate(dto);
  if (error) {
    const cause = error.details[0].message;
    throw new InternalError({ ...INTERNAL_ERRORS.BAD_REQUEST, cause });
  }

  return value;
}
