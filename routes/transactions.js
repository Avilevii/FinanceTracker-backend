import express from 'express';
import { getDataOfPerviod } from '../ctrl/transactionsCtrl.js';

const router = express.Router();

router.get('/transactions/:id', getDataOfPerviod);

export default router;