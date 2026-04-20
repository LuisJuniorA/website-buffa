import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validateRegister } from '../middlewares/validate.middleware.js';

const router = Router();

router.post('/register', validateRegister, authController.register);
router.post('/login', authController.login);

export default router;
