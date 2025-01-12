import axios from 'axios';
import assert from 'assert';
import { INVALID_QUERY_PARAMS } from './fixtures/invalid-data';
import { CORRECT_COUNTRY_DATA, CORRECT_QUERY_PARAMS, URL } from './fixtures/correct-data';

describe('Test suite "emission-for-country"', () => {
  it('Should return 404 for invalid path', async () => {
    try {
      await axios.get('http://127.0.0.1:5000/fake-address');
    } catch (error) {
      assert.equal(404, error.response.status);
      assert.equal('Not Found', error.response.statusText);

      return;
    }
    throw new Error('Expected 404 but no error was thrown');
  });

  it('Should reject invalid country code', async () => {
    try {
      await axios.get(`${URL}/99999999999`);
    } catch (error) {
      assert.equal(400, error.response.status);
      assert.equal('Bad Request: Invalid country code!', error.response.data.error);

      return;
    }
    throw new Error('Expected 400 but no error was thrown');
  });

  it('Should reject invalid query parameters', async () => {
    const countryCode = CORRECT_COUNTRY_DATA[0].countryCode;

    for (const parameter of INVALID_QUERY_PARAMS) {
      const request = `${URL}/${countryCode}?${parameter[0]}=${parameter[1]}`;

      try {
        await axios.get(request);
        throw new Error('Expected 400 but no error was thrown');
      } catch (error) {
        assert.equal(400, error?.response?.status);
      }
    }
  });

  it('Should return the correct data', async () => {
    const countryCode = CORRECT_COUNTRY_DATA[0].countryCode;
    const request = `${URL}/${countryCode}`;

    const response = await axios.get(request);

    assert.equal(200, response?.status);
    assert.deepStrictEqual(CORRECT_COUNTRY_DATA[0], response?.data[0]);
  });

  it('Should return the correct data when the query parameters are correct', async () => {
    const countryCode = CORRECT_COUNTRY_DATA[0].countryCode;
    let request = `${URL}/${countryCode}?`;

    for (const parameter of CORRECT_QUERY_PARAMS) {
      request = request + `&${parameter[0]}=${parameter[1]}`;
    }

    const response = await axios.get(request);

    assert.equal(200, response?.status);
    assert.deepStrictEqual(CORRECT_COUNTRY_DATA[4], response?.data[3]);
  });
});
