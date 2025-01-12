import footprintApi from './footprintApi';
import getHome from './home';
import { InternalError } from './errors/errors';
import { INTERNAL_ERROR_CODES } from './errors/error-codes';

export default {
  async getHomePage() {
    return getHome();
  },

  async getForCountry(args) {
    const { countryCode, year, pageFrom, pageTo } = args;
    const countries = await footprintApi.getCountries();
    const country = countries.find((item) => Number(item.countryCode) === countryCode);

    if (!country) {
      throw new InternalError('Invalid country code!', INTERNAL_ERROR_CODES.BAD_REQUEST);
    }

    const countryEmission = await footprintApi.getDataForCountry(countryCode);
    const isThereConditions = year || pageFrom || pageTo;

    return isThereConditions ? processData(countryEmission, args) : countryEmission;
  },
};

function processData(data, args) {
  const { year, pageFrom, pageTo, recordsPerPage } = args;
  let processedData;

  if (year) {
    processedData = [data.find((item) => Number(item.year) === year)];
  }
  if (pageFrom || pageTo) {
    const firstRecord = pageFrom ? pageFrom * recordsPerPage : 0;
    const lastRecord = pageTo ? pageTo * recordsPerPage : data.length - 1;

    processedData = data.slice(firstRecord, lastRecord);
  }

  return processedData;
}
