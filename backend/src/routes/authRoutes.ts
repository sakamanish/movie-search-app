import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validateRequest } from '../middlewares/validation';
import { authenticateToken } from '../middlewares/auth';
import { signupSchema, loginSchema } from '../validations/auth';

const router = Router();

router.post('/signup', validateRequest(signupSchema), AuthController.signup);
router.post('/login', validateRequest(loginSchema), AuthController.login);
router.get('/me', authenticateToken, AuthController.getMe);

export default router;