import express from 'express';
import { getForAll, getForCountryByCode, getForCountryByName, goHome } from './controller';

const router = express.Router();
router.get('/', goHome);
router.get('/emission-for-all', getForAll);
router.get('/emission-for-country/by-name/:countryName', getForCountryByName);
router.get('/emission-for-country/by-code/:countryCode', getForCountryByCode);

router.get('*', (rec, res) => {
  res.status(404).send('Not found');
});

export default router;
