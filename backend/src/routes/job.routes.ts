import { Router } from 'express';
import { listJobs, postJob, getJobsByPoster, updateJob, deleteJob } from '../controllers/job.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/roles.js';

const router = Router();

router.get('/', listJobs);
router.get('/my-jobs', requireAuth, requireRole('alumni', 'admin'), getJobsByPoster);
router.post('/', requireAuth, requireRole('alumni', 'admin'), postJob);
router.put('/:id', requireAuth, requireRole('alumni', 'admin'), updateJob);
router.delete('/:id', requireAuth, requireRole('alumni', 'admin'), deleteJob);

export default router;

