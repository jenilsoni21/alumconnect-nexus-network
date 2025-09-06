import { Router } from 'express';
import { listUsers, verifyUser } from '../controllers/admin.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/roles.js';

const router = Router();

router.get('/users', requireAuth, requireRole('admin'), listUsers);
router.post('/users/:id/verify', requireAuth, requireRole('admin'), verifyUser);

export default router;

