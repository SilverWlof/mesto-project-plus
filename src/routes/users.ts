import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateUserBioById,
  updateUserAvatarById,
} from '../controllers/users';
import {
  getUserByIdValidator,
  updateUserAvatarByIdValidator,
  updateUserBioByIdValidator,
} from '../validators/userValidator';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:userId', getUserByIdValidator, getUserById);
router.patch('/users/me', updateUserBioByIdValidator, updateUserBioById);
router.patch('/users/me/avatar', updateUserAvatarByIdValidator, updateUserAvatarById);

export default router;
