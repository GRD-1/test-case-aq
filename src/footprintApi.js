import axios from 'axios';
import { InternalError } from './errors/errors';
import { INTERNAL_ERROR_CODES } from './errors/error-codes';

export default {
  async get(apiUrl) {
    try {
      return await axios.get(apiUrl, {
        auth: {
          username: process.env.FOOTPRINT_USERNAME,
          password: process.env.FOOTPRINT_API_KEY,
        },
      });
    } catch (e) {
      switch (e.response.status) {
        case 429:
          throw new InternalError(e.message, INTERNAL_ERROR_CODES.TO_MANY_REQUESTS);
        default:
          throw new InternalError(e.message, INTERNAL_ERROR_CODES.SERVICE_UNAVAILABLE);
      }
    }
  },

  async getCountries() {
    const resp = await this.get('https://api.footprintnetwork.org/v1/countries');

    return resp.data;
  },

  async getDataForCountry(countryCode) {
    const resp = await this.get(`https://api.footprintnetwork.org/v1/data/${countryCode}/all/EFCpc`);

    return resp.data;
  },
};
