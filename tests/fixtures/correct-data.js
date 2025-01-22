export const API_URL = 'http://localhost:5000/emission';

export const COUNTRIES_URL = 'https://api.footprintnetwork.org/v1/countries';

export const getCountryDataURL = (countryCode) => {
  return `https://api.footprintnetwork.org/v1/data/${countryCode}/all/EFCpc`;
};

export const YEAR = 1963;

export const COUNTRIES = [
  {
    score: '3A',
    shortName: 'Armenia',
    countryCode: '1',
    countryName: 'Armenia',
    isoa2: 'AM',
  },
  {
    score: '3A',
    shortName: 'Afghanistan',
    countryCode: '2',
    countryName: 'Afghanistan',
    isoa2: 'AF',
  },
  {
    score: '3A',
    shortName: 'Albania',
    countryCode: '3',
    countryName: 'Albania',
    isoa2: 'AL',
  },
  {
    score: '3A',
    shortName: 'Algeria',
    countryCode: '4',
    countryName: 'Algeria',
    isoa2: 'DZ',
  },
];

export const COUNTRY_DATA = [
  {
    year: YEAR,
    countryCode: 1,
    countryName: 'Armenia',
    shortName: 'Armenia',
    isoa2: 'AO',
    record: 'EFConsPerCap',
    cropLand: 0.212061467564234,
    grazingLand: 0.17948866476204,
    forestLand: 0.158955416140642,
    fishingGround: 0.256711728553073,
    builtupLand: 0.0254600561927883,
    carbon: null,
    value: 0.895654465860039,
    score: '3A',
  },
  {
    year: YEAR,
    countryCode: 2,
    countryName: 'Afghanistan',
    shortName: 'Afghanistan',
    isoa2: 'AO',
    record: 'EFConsPerCap',
    cropLand: 0.212061467564234,
    grazingLand: 0.17948866476204,
    forestLand: 0.158955416140642,
    fishingGround: 0.256711728553073,
    builtupLand: 0.0254600561927883,
    carbon: 0.0366289633406242,
    value: 0.895654465860039,
    score: '3A',
  },
  {
    year: YEAR,
    countryCode: 3,
    countryName: 'Albania',
    shortName: 'Albania',
    isoa2: 'AO',
    record: 'EFConsPerCap',
    cropLand: 0.212061467564234,
    grazingLand: 0.17948866476204,
    forestLand: 0.158955416140642,
    fishingGround: 0.256711728553073,
    builtupLand: 0.0254600561927883,
    carbon: 0.3696380278957,
    value: 0.895654465860039,
    score: '3A',
  },
  {
    year: YEAR,
    countryCode: 4,
    countryName: 'Algeria',
    shortName: 'Algeria',
    isoa2: 'AO',
    record: 'EFConsPerCap',
    cropLand: 0.212061467564234,
    grazingLand: 0.17948866476204,
    forestLand: 0.158955416140642,
    fishingGround: 0.256711728553073,
    builtupLand: 0.0254600561927883,
    carbon: 0.0504863361219865,
    value: 0.895654465860039,
    score: '3A',
  },
];

export const CORRECT_RESPONSE = {
  Armenia: {
    score: '3A',
    countryCode: 1,
    countryName: 'Armenia',
    carbon: null,
  },
  Afghanistan: {
    score: '3A',
    countryCode: 2,
    countryName: 'Afghanistan',
    carbon: 0.0366289633406242,
  },
  Albania: {
    score: '3A',
    countryCode: 3,
    countryName: 'Albania',
    carbon: 0.3696380278957,
  },
  Algeria: {
    score: '3A',
    countryCode: 4,
    countryName: 'Algeria',
    carbon: 0.0504863361219865,
  },
};
