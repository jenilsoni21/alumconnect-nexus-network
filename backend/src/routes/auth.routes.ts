import { Router } from 'express';
import { login, me, register } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/me', requireAuth, me);

export default router;

