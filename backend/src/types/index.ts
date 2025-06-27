import { Request } from 'express';
import { Prisma } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
  user?: Prisma.User;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}