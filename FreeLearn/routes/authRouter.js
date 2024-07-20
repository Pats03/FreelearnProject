import { Router } from 'express';
const router = Router();

import { validateUserInput,validateLoginInput } from '../middleware/validationMiddleware.js';
import { createuser,login } from '../controllers/authController.js';

router.post('/register', validateUserInput,createuser);
router.post('/login',validateLoginInput, login);
router.get('/logout', logout);

export default router;
