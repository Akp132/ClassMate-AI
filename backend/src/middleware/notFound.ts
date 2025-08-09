import { Request, Response } from 'express';
import { ApiError } from '@/types';

export const notFound = (req: Request, res: Response) => {
  const error: ApiError = {
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.originalUrl} not found`,
    },
  };
  
  res.status(404).json(error);
};