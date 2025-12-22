import express from 'express';

const router = express.Router();

router.get('/getAllHistory');
router.get('/gethistoryById/:id');
router.post('/createHistory');
router.put('/updateHistory/:id');
router.delete('/deleteHistory/:id');

export default router;
