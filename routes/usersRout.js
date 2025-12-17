import express from 'express';

const router = express.Router();

router.get('/getAllUsers');
router.get('/getUserById/:id');
router.post('/createUser');
router.put('/updateUser');
router.delete('/deleteUser');

export default router;
