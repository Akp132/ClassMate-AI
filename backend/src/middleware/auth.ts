import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '@/server';
import { AuthenticatedRequest, TokenPayload } from '@/types';

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'NO_TOKEN',
          message: 'No authentication token provided',
        },
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not configured');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
    
    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found',
        },
      });
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
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // Continue without authentication
    }

    const token = authHeader.substring(7);
    
    if (!process.env.JWT_SECRET) {
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

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