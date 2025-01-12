import express from 'express';
import { getEmissionForCountry, goHome } from './controller';

const router = express.Router();
router.get('/', goHome);
router.get('/emission-for-country/:countryCode', getEmissionForCountry);

router.get('*', (rec, res) => {
  res.status(404).send('Not Found');
});

export default router;
