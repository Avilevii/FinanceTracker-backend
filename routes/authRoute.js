import express from 'express';
import { createUserCtrl } from '../ctrl/usersCtrl.js';
import { loginCtrl } from '../ctrl/authCtrl.js';

const router = express.Router();

router.post('/signUp', createUserCtrl)
router.post('/login', loginCtrl)

export default router