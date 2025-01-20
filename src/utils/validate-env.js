import Joi from 'joi';

const EnvSchema = Joi.object({
  FOOTPRINT_API_KEY: Joi.string().required(),
  FOOTPRINT_USERNAME: Joi.string().required(),
  FOOTPRINT_RATE_LIMIT: Joi.number().default(100),
  APP_PORT: Joi.number().port().default(5000),
  GLOBAL_TIMEOUT: Joi.number().default(180000),
}).unknown();

export function validateEnvVars() {
  const { error } = EnvSchema.validate(process.env, { abortEarly: false });
  if (error) {
    console.error('Environment variables validation error:');
    error.details.forEach((err) => {
      console.error(`- ${err.message}`);
    });
    process.exit(1);
  }
  console.log('Environment variables validation passed');
}
