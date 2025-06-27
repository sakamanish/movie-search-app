import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { sendSuccess, sendError } from '../utils/response';
import { SignupInput, LoginInput } from '../validations/auth';
import { AuthenticatedRequest } from '../types';

export class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const data: SignupInput = req.body;
      const result = await AuthService.signup(data);
      
      sendSuccess(res, 'User registered successfully', result, 201);
    } catch (error: any) {
      if (error.message === 'User already exists with this email') {
        return sendError(res, error.message, 400);
      }
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data: LoginInput = req.body;
      const result = await AuthService.login(data);
      
      sendSuccess(res, 'Login successful', result);
    } catch (error: any) {
      if (error.message === 'Invalid email or password') {
        return sendError(res, error.message, 401);
      }
      next(error);
    }
  }

  static async getMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendError(res, 'User not found', 404);
      }

      const user = await AuthService.getUserById(req.user.id);
      
      if (!user) {
        return sendError(res, 'User not found', 404);
      }

      sendSuccess(res, 'User profile retrieved', user);
    } catch (error) {
      next(error);
    }
  }
}