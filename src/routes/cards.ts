import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} from '../controllers/cards';
import {
  createCardValidator,
  deleteCardByIdValidator,
  dislikeCardValidator,
  likeCardValidator,
} from '../validators/cardValidator';

const router = Router();

router.get('/cards', getCards);
router.post('/cards', createCardValidator, createCard);
router.delete('/cards/:cardId', deleteCardByIdValidator, deleteCardById);
router.put('/cards/:cardId/likes', likeCardValidator, likeCard);
router.delete('/cards/:cardId/likes', dislikeCardValidator, dislikeCard);

export default router;
