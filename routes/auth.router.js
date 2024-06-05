import { Router } from 'express';
import {signup, signin, getMe, logout} from '../controllers/auth.controller.js';
import authMiddleware from "../widdlewares/auth.middleware.js";
const router = Router()

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/getMe', authMiddleware, getMe);
router.get('/logout', authMiddleware, logout);

export default router;