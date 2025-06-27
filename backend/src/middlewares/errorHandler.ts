import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  if (error.name === 'PrismaClientKnownRequestError') {
    return sendError(res, 'Database error occurred', 500);
  }

  if (error.name === 'JsonWebTokenError') {
    return sendError(res, 'Invalid token', 401);
  }

  if (error.name === 'TokenExpiredError') {
    return sendError(res, 'Token expired', 401);
  }

  return sendError(res, 'Internal server error', 500, error.message);
};

export const notFoundHandler = (req: Request, res: Response) => {
  sendError(res, `Route ${req.originalUrl} not found`, 404);
};