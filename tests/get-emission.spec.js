import axios from 'axios';
import sinon from 'sinon';
import { expect } from 'chai';
import { INVALID_REQ_PARAMS } from './fixtures/invalid-data.js';
import {
  COUNTRIES,
  API_URL,
  COUNTRIES_URL,
  getCountryDataURL,
  COUNTRY_DATA,
  CORRECT_RESPONSE,
  YEAR,
} from './fixtures/correct-data.js';
import { application, footprintApi } from './fixtures/get-application.js';

describe('Test suite "get-emission"', function () {
  this.timeout(20000);
  let getStub;

  before(() => {
    getStub = sinon.stub(footprintApi, 'get');

    getStub.withArgs(COUNTRIES_URL).resolves({ data: COUNTRIES });

    COUNTRIES.forEach((country, i) => {
      const url = getCountryDataURL(country.countryCode);
      getStub.withArgs(url).resolves({ data: [COUNTRY_DATA[i]] });
    });
  });

  after((done) => {
    sinon.restore();
    application.close(() => {
      done();
    });
  });

  it('Should return 404 for invalid path', async () => {
    try {
      await axios.get(`${API_URL}-fake-address`);
    } catch (error) {
      expect(error.response.status).to.equal(404);
      expect(error.response.statusText).to.equal('Not Found');

      return;
    }
    throw new Error('Expected 404 but no error was thrown');
  });

  it('Should reject invalid year', async () => {
    let errNumber = 0;

    for (let req of INVALID_REQ_PARAMS) {
      try {
        await axios.get(`${API_URL}/${req.year}`);
      } catch (error) {
        expect(error.response.status).to.equal(400);
        expect(error.response.data.error).to.equal(req.error);
        errNumber++;
      }
    }
    expect(errNumber).to.equal(INVALID_REQ_PARAMS.length);
  });

  it('Should return the correct data', async () => {
    const request = `${API_URL}/${YEAR}`;

    const response = await axios.get(request);

    expect(response?.status).to.equal(200);
    expect(response?.data).to.deep.equal(CORRECT_RESPONSE);
  });
});
