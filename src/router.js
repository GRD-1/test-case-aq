import express from 'express';
import Controller from './controller';

const router = express.Router();
router.get('/', Controller.goHome);
router.get('/emission/:year', Controller.getEmission);

router.get('*', (rec, res) => {
  res.status(404).send('Not Found');
});

export default router;
