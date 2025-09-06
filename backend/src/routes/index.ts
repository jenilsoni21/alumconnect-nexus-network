import { Router } from 'express';
import authRoutes from './auth.routes.js';
import blogRoutes from './blog.routes.js';
import jobRoutes from './job.routes.js';
import eventRoutes from './event.routes.js';
import messageRoutes from './message.routes.js';
import mentorshipRoutes from './mentorship.routes.js';
import adminRoutes from './admin.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/blogs', blogRoutes);
router.use('/jobs', jobRoutes);
router.use('/events', eventRoutes);
router.use('/messages', messageRoutes);
router.use('/mentorship', mentorshipRoutes);
router.use('/admin', adminRoutes);

export default router;

