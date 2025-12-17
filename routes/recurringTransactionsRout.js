import express from 'express';

const router = express.Router();

router.get('/getAllRecurringTransactions');
router.get('/getAllRecurringTransactionsById/:id');
router.post('/createRecurringTransaction');
router.put('/updateRecurringTransaction');
router.delete('/deleteRecurringTransaction');

export default router;
