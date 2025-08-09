import jwt, { SignOptions } from 'jsonwebtoken';
import { TokenPayload } from '@/types';

export const generateToken = (payload: Omit<TokenPayload, 'iat' | 'exp'>): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not configured');
  }

  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

export const verifyToken = (token: string): TokenPayload => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not configured');
  }

  return jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
};