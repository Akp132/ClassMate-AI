import { Router } from 'express';
import { authenticate } from '@/middleware/auth-simple';

const router = Router();
router.use(authenticate);

// Placeholder routes - will be implemented in next iteration
router.post('/', (req, res) => {
  res.json({ success: true, message: 'File upload endpoint - coming soon' });
});

router.post('/multiple', (req, res) => {
  res.json({ success: true, message: 'Multiple file upload endpoint - coming soon' });
});

export default router;