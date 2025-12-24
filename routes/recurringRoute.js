import express from 'express';
import { createRecurringCtrl, deleteRecurringCtrl, getAllRecurringCtrl, getRecurringByIdCtrl, updateRecurringCtrl } from '../ctrl/recurringCtrl.js';

const router = express.Router();

router.get('/getAllRecurring', getAllRecurringCtrl);
router.get('/getRecurringById/:id', getRecurringByIdCtrl);
router.post('/createRecurring', createRecurringCtrl);
router.put('/updateRecurring/:id', updateRecurringCtrl);
router.delete('/deleteRecurring/:id', deleteRecurringCtrl);

export default router;
