import express from 'express';
import { getDataOfPeriod } from '../ctrl/transactionsCtrl.js';

const router = express.Router();

router.get('/transactions/:userId', getDataOfPeriod);

export default router;