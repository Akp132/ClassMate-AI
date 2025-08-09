import { Router } from 'express';
import { authenticate } from '@/middleware/auth-simple';

const router = Router();
router.use(authenticate);

// Placeholder routes - will be implemented in next iteration
router.get('/', (req, res) => {
  res.json({ success: true, data: [], message: 'Assignments endpoint - coming soon' });
});

router.get('/upcoming', (req, res) => {
  res.json({ success: true, data: [], message: 'Upcoming assignments endpoint - coming soon' });
});

router.post('/sync', (req, res) => {
  res.json({ success: true, data: [], message: 'Assignment sync endpoint - coming soon' });
});

export default router;