import { Router } from 'express';
import { classController } from '@/controllers/classes';
import { authenticate } from '@/middleware/auth';

const router = Router();

// All class routes require authentication
router.use(authenticate);

router.get('/', classController.getAll);
router.get('/:id', classController.getById);
router.post('/', classController.create);
router.put('/:id', classController.update);
router.delete('/:id', classController.delete);
router.post('/sync', classController.sync);

export default router;