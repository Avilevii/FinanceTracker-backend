import express from 'express';
import { createHistoryCtrl, deleteHistoryCtrl, getAllHistoryCtrl, getHistoryByIdCtrl, updateHistoryCtrl } from '../ctrl/historyCtrl.js';

const router = express.Router();

router.get('/getAllHistory', getAllHistoryCtrl);
router.get('/gethistoryById/:id', getHistoryByIdCtrl);
router.post('/createHistory', createHistoryCtrl);
router.put('/updateHistory/:id', updateHistoryCtrl);
router.delete('/deleteHistory/:id', deleteHistoryCtrl);

export default router;
