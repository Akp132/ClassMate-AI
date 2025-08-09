import { Router } from 'express';
import { authenticate } from '@/middleware/auth-simple';

const router = Router();
router.use(authenticate);

// Placeholder routes - will be implemented in next iteration
router.get('/events', (req, res) => {
  res.json({ success: true, data: [], message: 'Calendar events endpoint - coming soon' });
});

router.post('/events', (req, res) => {
  res.json({ success: true, message: 'Create event endpoint - coming soon' });
});

router.post('/sync', (req, res) => {
  res.json({ success: true, data: [], message: 'Calendar sync endpoint - coming soon' });
});

export default router;