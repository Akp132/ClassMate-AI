import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/types';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  // Default error
  let error: ApiError = {
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong',
    },
  };

  // Validation errors (Zod)
  if (err.name === 'ZodError') {
    error = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input data',
        details: err.errors.map((e: any) => ({
          field: e.path.join('.'),
          message: e.message,
          value: e.received,
        })),
      },
    };
    return res.status(400).json(error);
  }

  // Prisma errors
  if (err.code === 'P2002') {
    error = {
      success: false,
      error: {
        code: 'DUPLICATE_ENTRY',
        message: 'A record with this data already exists',
        details: err.meta,
      },
    };
    return res.status(409).json(error);
  }

  if (err.code === 'P2025') {
    error = {
      success: false,
      error: {
        code: 'RECORD_NOT_FOUND',
        message: 'The requested record was not found',
      },
    };
    return res.status(404).json(error);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid authentication token',
      },
    };
    return res.status(401).json(error);
  }

  if (err.name === 'TokenExpiredError') {
    error = {
      success: false,
      error: {
        code: 'TOKEN_EXPIRED',
        message: 'Authentication token has expired',
      },
    };
    return res.status(401).json(error);
  }

  // Custom API errors
  if (err.code && err.message) {
    error = {
      success: false,
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
      },
    };
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json(error);
  }

  // File upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    error = {
      success: false,
      error: {
        code: 'FILE_TOO_LARGE',
        message: 'File size exceeds maximum allowed size',
      },
    };
    return res.status(413).json(error);
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    error = {
      success: false,
      error: {
        code: 'INVALID_FILE_FIELD',
        message: 'Unexpected file field',
      },
    };
    return res.status(400).json(error);
  }

  // Default error response
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json(error);
};