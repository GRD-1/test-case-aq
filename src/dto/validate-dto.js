export default function validateDTO(schema, pathParams, queryParams) {
  const dto = { ...pathParams, ...queryParams };
  const { value, error } = schema.validate(dto);
  if (error) {
    throw new global.ValidationError(error.details[0].message);
  }

  return value;
}
