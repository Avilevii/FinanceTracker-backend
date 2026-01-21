import express from 'express';
import { createHistoryCtrl, deleteHistoryCtrl, getAllHistoryCtrl,  getHistoryByUserIdCtrl, updateHistoryCtrl } from '../ctrl/historyCtrl.js';

const router = express.Router();

router.get('/getAllHistory', getAllHistoryCtrl);
router.get('/gethistoryByUserId/:userId', getHistoryByUserIdCtrl);
router.post('/createHistory', createHistoryCtrl);
router.put('/updateHistory/:id', updateHistoryCtrl);
router.delete('/deleteHistory/:id', deleteHistoryCtrl);

export default router;
