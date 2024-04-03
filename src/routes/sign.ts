import { Router } from 'express';
import {
  createUser,
  login,
} from '../controllers/users';
import {
  createUserValidator,
  loginValidator,
} from '../validators/signValidator';

const router = Router();
router.post('/signin', loginValidator, login);
router.post('/signup', createUserValidator, createUser);

export default router;
