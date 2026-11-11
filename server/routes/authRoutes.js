import express from 'express';
import { register, login }  from '../controllers/authController.js';
import { verifyRefreshToken,verifyAcessToken } from '../middleware/auth.js';
const router = express.Router();

router.post('/register', register);
router.post('/login',login);
router.post('/refresh',verifyRefreshToken,);

router.get('/login',login);

export default router;