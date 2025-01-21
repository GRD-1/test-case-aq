export const API_URL = 'http://localhost:5000/emission';
export const COUNTRIES_URL = 'https://api.footprintnetwork.org/v1/countries';
export const getCountryDataURL = (countryCode) => {
  return `https://api.footprintnetwork.org/v1/data/${countryCode}/all/EFCpc`;
};

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
    id: '1',
    status: 'success',
  },
  {
    id: '2',
    status: 'success',
    result: {
      year: 1963,
      countryCode: 2,
      countryName: 'Afghanistan',
      shortName: 'Afghanistan',
      isoa2: 'AF',
      record: 'EFConsPerCap',
      cropLand: 0.745285603826234,
      grazingLand: 0.582998391202737,
      forestLand: 0.0899793492294371,
      fishingGround: 0.0000457598565418197,
      builtupLand: 0.0159487777444396,
      carbon: 0.0366289633406242,
      value: 1.47088684520001,
      score: '3A',
    },
  },
  {
    id: '3',
    status: 'success',
    result: {
      year: 1963,
      countryCode: 3,
      countryName: 'Albania',
      shortName: 'Albania',
      isoa2: 'AL',
      record: 'EFConsPerCap',
      cropLand: 0.24160887348702,
      grazingLand: 0.382155394581791,
      forestLand: 0.404514836070901,
      fishingGround: 0.00283719655773273,
      builtupLand: 0.0200704490353452,
      carbon: 0.3696380278957,
      value: 1.42082477762849,
      score: '3A',
    },
  },
  {
    id: '4',
    status: 'success',
    result: {
      year: 1963,
      countryCode: 4,
      countryName: 'Algeria',
      shortName: 'Algeria',
      isoa2: 'DZ',
      record: 'EFConsPerCap',
      cropLand: 0.425361426824019,
      grazingLand: 0.148251593592735,
      forestLand: 0.120529655528784,
      fishingGround: 0.0124714528115125,
      builtupLand: 0.0143671516711552,
      carbon: 0.0504863361219865,
      value: 0.771467616550191,
      score: '3A',
    },
  },
];

export const CORRECT_RESPONSE = [
  {
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
  },
];
