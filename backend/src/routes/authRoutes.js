import express from 'express';
import { register, login, changePassword } from '../controllers/authController.js';

const router = express.Router();
router.post('/register-user', register);
router.post('/login-user', login);
router.put('/change-password', changePassword);

export default router;