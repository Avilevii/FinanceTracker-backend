import express from 'express';

const router = express.Router();

router.get('/getAllRecurringTransactions');
router.get('/getAllRecurringTransactionsById/:id');
router.post('/createRecurringTransaction');
router.put('/updateRecurringTransaction/:id');
router.delete('/deleteRecurringTransaction/:id');

export default router;
