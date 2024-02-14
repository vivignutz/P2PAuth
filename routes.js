// routes.js
import express from 'express';
import { registerUser, loginUser, deleteUser } from './userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/delete', deleteUser);

export default router;
