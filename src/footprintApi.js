import axios from 'axios';
import { InternalError } from './errors/errors.js';
import { INTERNAL_ERRORS } from './errors/error-codes.js';

export default class FootprintApi {
  static getInstance() {
    if (!this._instance) {
      this._instance = new FootprintApi();
    }

    return this._instance;
  }

  async get(apiUrl) {
    try {
      return await axios.get(apiUrl, {
        auth: {
          username: process.env.FOOTPRINT_USERNAME,
          password: process.env.FOOTPRINT_API_KEY,
        },
      });
    } catch (e) {
      throw new InternalError({ ...INTERNAL_ERRORS.SERVICE_UNAVAILABLE, cause: e.message });
    }
  }

  async getCountries() {
    const resp = await this.get('https://api.footprintnetwork.org/v1/countries');

    return resp.data;
  }

  async getDataForCountry(countryCode) {
    const resp = await this.get(
      `https://api.footprintnetwork.org/v1/data/${countryCode}/all/EFCpc`,
    );

    return resp.data;
  }
}
