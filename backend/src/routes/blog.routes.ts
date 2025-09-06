import { Router } from 'express';
import { createBlog, listAllBlogs, listMyBlogs, updateBlog, deleteBlog } from '../controllers/blog.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/roles.js';

const router = Router();

router.get('/', listAllBlogs);
router.get('/me', requireAuth, requireRole('admin', 'alumni'), listMyBlogs);
router.post('/', requireAuth, requireRole('admin', 'alumni'), createBlog);
router.put('/:id', requireAuth, requireRole('admin', 'alumni'), updateBlog);
router.delete('/:id', requireAuth, requireRole('admin', 'alumni'), deleteBlog);

export default router;

