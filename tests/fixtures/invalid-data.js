export const INVALID_REQ_PARAMS = [
  { year: 'year', error: 'Bad Request: "year" must be a number' },
  { year: -5, error: 'Bad Request: "year" must be greater than or equal to 1960' },
  { year: 0, error: 'Bad Request: "year" must be greater than or equal to 1960' },
  { year: 1905, error: 'Bad Request: "year" must be greater than or equal to 1960' },
  { year: 3500, error: 'Bad Request: "year" must be less than or equal to 3000' },
];
