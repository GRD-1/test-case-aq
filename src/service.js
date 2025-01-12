import footprintApi from './footprintApi';
import goHomeHandler from './home';

export async function getHomePage() {
  return goHomeHandler();
}

export async function getForCountry() {
  //TODO: check if the country exists

  return 'getForCountry';
}

export async function getForAllCountries() {
  return 'getForAll';
}
