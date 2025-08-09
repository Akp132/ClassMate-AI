import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, TokenPayload } from '@/types';
import { verifyToken } from '@/utils/jwt';
import { users } from '@/controllers/auth-simple';

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: {
          code: 'NO_TOKEN',
          message: 'No authentication token provided',
        },
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not configured');
    }

    // Verify token
    const decoded = verifyToken(token);
    
    // Get user from in-memory store
    const user = users.find(u => u.id === decoded.userId);

    if (!user) {
      res.status(401).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found',
        },
      });
      return;
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      next(); // Continue without authentication
      return;
    }

    const token = authHeader.substring(7);
    
    if (!process.env.JWT_SECRET) {
      next();
      return;
    }

    try {
      const decoded = verifyToken(token);
      
      const user = users.find(u => u.id === decoded.userId);

      if (user) {
        req.user = user;
      }
    } catch (tokenError) {
      // Token invalid, but continue without authentication
      console.warn('Invalid optional token:', tokenError);
    }
    
    next();
  } catch (error) {
    next(error);
  }
};