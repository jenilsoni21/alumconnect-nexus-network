import { Router } from 'express';
import { createEvent, listEvents, getEventsByCreator, updateEvent, deleteEvent } from '../controllers/event.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/roles.js';

const router = Router();

router.get('/', listEvents);
router.get('/my-events', requireAuth, requireRole('admin', 'alumni'), getEventsByCreator);
router.post('/', requireAuth, requireRole('admin', 'alumni'), createEvent);
router.put('/:id', requireAuth, requireRole('admin', 'alumni'), updateEvent);
router.delete('/:id', requireAuth, requireRole('admin', 'alumni'), deleteEvent);

export default router;

