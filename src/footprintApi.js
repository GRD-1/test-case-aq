import axios from 'axios';
import { InternalError } from './errors/errors';
import { INTERNAL_ERROR_CODES } from './errors/error-codes';
import rateLimiter from './rate-limiter';

export default {
  async get(apiUrl) {
    try {
      const delay = rateLimiter.getDelayForNextRequest();

      return await this.makeRequest(apiUrl, delay);
    } catch (e) {
      if (e.response.status === 429) {
        const data = await this.repeatRequest(apiUrl);
        rateLimiter.updateLimit();

        return data;
      } else {
        throw new InternalError(e.message, INTERNAL_ERROR_CODES.SERVICE_UNAVAILABLE);
      }
    }
  },

  async getCountries() {
    const resp = await this.get('https://api.footprintnetwork.org/v1/countries');

    return resp.data;
  },

  async getDataForCountry(countryCode) {
    const resp = await this.get(
      `https://api.footprintnetwork.org/v1/data/${countryCode}/all/EFCpc`,
    );

    return resp.data;
  },

  async makeRequest(apiUrl, delay) {
    if (delay) await new Promise((resolve) => setTimeout(resolve, delay));

    return axios.get(apiUrl, {
      auth: {
        username: process.env.FOOTPRINT_USERNAME,
        password: process.env.FOOTPRINT_API_KEY,
      },
    });
  },

  async repeatRequest(apiUrl) {
    const delay = rateLimiter.getDelayForNextRequest();
    let attemptNumber = 0;
    let data;

    while (attemptNumber < process.env.FOOTPRINT_REPEATS && !data) {
      attemptNumber++;

      data = this.makeRequest(apiUrl, delay).catch(() =>
        console.log(`request ${attemptNumber} failed`),
      );
    }

    if (!data) {
      throw new InternalError('Service is unavailable', INTERNAL_ERROR_CODES.SERVICE_UNAVAILABLE);
    }

    return data;
  },
};
