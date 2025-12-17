import express from 'express';

const router = express.Router();

router.get('/getAllHistory');
router.get('/gethistoryById/:id');
router.post('/createHistory');
router.put('/updateHistory');
router.delete('/deleteHistory');

export default router;
