import express from 'express';
import { createUserCtrl, deleteUserCtrl, getAllUsersCtrl, getUserByIdCtrl, updateUserCtrl } from '../ctrl/usersCtrl.js';

const router = express.Router();

router.get('/getAllUsers', getAllUsersCtrl);
router.get('/getUserById/:id', getUserByIdCtrl);
router.post('/createUser', createUserCtrl);
router.put('/updateUser/:id', updateUserCtrl);
router.delete('/deleteUser/:id', deleteUserCtrl);

export default router;
