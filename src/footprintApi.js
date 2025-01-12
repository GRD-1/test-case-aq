import axios from 'axios';

export default {
  get(apiUrl) {
    return axios.get(apiUrl, {
      auth: {
        username: process.env.FOOTPRINT_USERNAME,
        password: process.env.FOOTPRINT_API_KEY,
      },
    });
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
