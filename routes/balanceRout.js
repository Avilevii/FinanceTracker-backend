import express from 'express';
import { getBalanceCtrl } from '../ctrl/balanceCtrl.js';

const router = express.Router();

router.get("/getBalance/:id", getBalanceCtrl);

export default router