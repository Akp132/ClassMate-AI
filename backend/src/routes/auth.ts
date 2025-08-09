import { Router } from 'express';
import { authController } from '@/controllers/auth';
import { authenticate, optionalAuth } from '@/middleware/auth';

const router = Router();

// Public routes
router.post('/login', authController.login);

// Protected routes
router.get('/me', authenticate, authController.me);
router.post('/logout', authenticate, authController.logout);
router.put('/profile', authenticate, authController.updateProfile);
router.delete('/account', authenticate, authController.deleteAccount);

export default router;