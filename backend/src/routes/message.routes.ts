import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { sendMessage, thread } from '../controllers/message.controller.js';

const router = Router();

router.get('/thread/:userId', requireAuth, thread);
router.post('/', requireAuth, sendMessage);

export default router;

