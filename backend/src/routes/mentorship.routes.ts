import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { myMentorships, requestMentorship, respondMentorship } from '../controllers/mentorship.controller.js';
import { requireRole } from '../middleware/roles.js';

const router = Router();

router.get('/me', requireAuth, myMentorships);
router.post('/', requireAuth, requestMentorship);
router.post('/:id/respond', requireAuth, requireRole('alumni', 'admin'), respondMentorship);

export default router;

