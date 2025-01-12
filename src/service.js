import footprintApi from './footprintApi';
import goHomeHandler from './home';
import { InternalError } from './errors/errors';
import { INTERNAL_ERROR_CODES } from './errors/error-codes';

export async function getHomePage() {
  return goHomeHandler();
}

export async function getForCountry(args) {
  const { countryCode, pageFrom, pageTo, recordsPerPage, year } = args;
  const countries = await footprintApi.getCountries();
  const country = countries.find((item) => Number(item.countryCode) === countryCode);

  if (!country) {
    throw new InternalError('Invalid country code!', INTERNAL_ERROR_CODES.BAD_REQUEST);
  }

  return footprintApi.getDataForCountry(country.countryCode);
}

export async function getForAllCountries() {
  return 'getForAll';
}
