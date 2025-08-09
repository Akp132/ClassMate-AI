import { Response, NextFunction } from 'express';
import { prisma } from '@/server';
import { AuthenticatedRequest, LoginData, ApiResponse } from '@/types';
import { generateToken } from '@/utils/jwt';
import { loginSchema } from '@/utils/validation';

export const authController = {
  // POST /api/auth/login
  login: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const validatedData = loginSchema.parse(req.body) as LoginData;

      // Find or create user
      let user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: validatedData.email },
            { googleId: validatedData.googleId },
          ],
        },
      });

      if (!user) {
        // Create new user
        user = await prisma.user.create({
          data: {
            email: validatedData.email,
            name: validatedData.name,
            picture: validatedData.picture,
            googleId: validatedData.googleId,
          },
        });
      } else {
        // Update existing user with latest info
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            name: validatedData.name,
            picture: validatedData.picture,
            googleId: validatedData.googleId || user.googleId,
          },
        });
      }

      // Generate JWT token
      const token = generateToken({
        userId: user.id,
        email: user.email,
      });

      const response: ApiResponse = {
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            picture: user.picture,
          },
          token,
        },
        message: 'Login successful',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  // GET /api/auth/me
  me: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'User not authenticated',
          },
        });
      }

      const response: ApiResponse = {
        success: true,
        data: {
          id: req.user.id,
          email: req.user.email,
          name: req.user.name,
          picture: req.user.picture,
          createdAt: req.user.createdAt,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  // POST /api/auth/logout
  logout: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      // For JWT, logout is handled client-side by removing the token
      // In the future, we could implement token blacklisting
      
      const response: ApiResponse = {
        success: true,
        message: 'Logout successful',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/auth/profile
  updateProfile: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'User not authenticated',
          },
        });
      }

      const { name, picture } = req.body;

      const updatedUser = await prisma.user.update({
        where: { id: req.user.id },
        data: {
          ...(name && { name }),
          ...(picture && { picture }),
        },
      });

      const response: ApiResponse = {
        success: true,
        data: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          picture: updatedUser.picture,
        },
        message: 'Profile updated successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/auth/account
  deleteAccount: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'User not authenticated',
          },
        });
      }

      // Delete user and all associated data (cascade delete)
      await prisma.user.delete({
        where: { id: req.user.id },
      });

      const response: ApiResponse = {
        success: true,
        message: 'Account deleted successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
};