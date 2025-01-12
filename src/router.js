import express from 'express';
import Controller from './controller';

const router = express.Router();
router.get('/', Controller.goHome);
router.get('/emission-for-country/:countryCode', Controller.getEmissionForCountry);

router.get('*', (rec, res) => {
  res.status(404).send('Not Found');
});

export default router;
