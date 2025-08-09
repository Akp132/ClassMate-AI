import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, LoginData, ApiResponse } from '@/types';
import { generateToken } from '@/utils/jwt';
import { loginSchema } from '@/utils/validation';

// Simple in-memory user storage (will be replaced with database)
let users: any[] = [];
let userIdCounter = 1;

export const authController = {
  // POST /api/auth/login
  login: async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedData = loginSchema.parse(req.body) as LoginData;

      // Find or create user
      let user = users.find(u => u.email === validatedData.email || u.googleId === validatedData.googleId);

      if (!user) {
        // Create new user
        user = {
          id: `user_${userIdCounter++}`,
          email: validatedData.email,
          name: validatedData.name,
          picture: validatedData.picture,
          googleId: validatedData.googleId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        users.push(user);
      } else {
        // Update existing user with latest info
        user.name = validatedData.name;
        user.picture = validatedData.picture;
        user.googleId = validatedData.googleId || user.googleId;
        user.updatedAt = new Date();
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
  me: async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'User not authenticated',
          },
        });
        return;
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
  logout: async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      // For JWT, logout is handled client-side by removing the token
      
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
  updateProfile: async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'User not authenticated',
          },
        });
        return;
      }

      const { name, picture } = req.body;

      // Find and update user
      const userIndex = users.findIndex(u => u.id === req.user!.id);
      if (userIndex === -1) {
        res.status(404).json({
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found',
          },
        });
        return;
      }

      if (name) users[userIndex].name = name;
      if (picture) users[userIndex].picture = picture;
      users[userIndex].updatedAt = new Date();

      const response: ApiResponse = {
        success: true,
        data: {
          id: users[userIndex].id,
          email: users[userIndex].email,
          name: users[userIndex].name,
          picture: users[userIndex].picture,
        },
        message: 'Profile updated successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/auth/account
  deleteAccount: async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'User not authenticated',
          },
        });
        return;
      }

      // Remove user from array
      users = users.filter(u => u.id !== req.user!.id);

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

// Export users for other controllers to use
export { users };