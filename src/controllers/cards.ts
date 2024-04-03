/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, NextFunction } from 'express';
import card from '../models/card';
import { authRequest } from '../common/autorisedRequest';
import {
  SuccesOnCreationCode,
} from '../common/constants';
import IncorrectDataException from '../common/exceptions/IncorrectDataException';
import ForbiddenException from '../common/exceptions/ForbiddenException';
import NotFoundException from '../common/exceptions/NotFoundException';

export const getCards = (req: authRequest, res: Response, next: NextFunction) => card.find({})
  .then((foundCards: any) => res.send({ data: foundCards }))
  .catch(next);

export const createCard = (req: authRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.user?._id;
  return card.create({ name, link, owner })
    .then((createdCard) => res.status(SuccesOnCreationCode).send({ data: createdCard }))
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new IncorrectDataException('Переданы некорректные данные при создании карточки.'));

      return next(err);
    });
};

export const deleteCardById = (req: authRequest, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user?._id;
  return card.findById(cardId)
    .orFail(new Error('NoCardException'))
    .then((foundCard) => {
      if (userId !== foundCard.owner.toString()) {
        return Promise.reject(new Error('RightsException'));
      }

      return card.findByIdAndDelete(cardId).then((deletedCard) => res.send({ data: deletedCard }));
    })
    .catch((err) => {
      if (err.message === 'RightsException') return next(new ForbiddenException('Карточка с указанным _id не найдена.'));
      if (err.message === 'NoCardException') return next(new NotFoundException('Карточка с указанным _id не найдена.'));

      return next(err);
    });
};

export const likeCard = (req: authRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  return card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: userId } }, { new: true })
    .orFail(new Error('NoCardException'))
    .then((foundCard) => res.send({ data: foundCard }))
    .catch((err) => {
      if (err.message === 'NoCardException') return next(new NotFoundException('Карточка с указанным _id не найдена.'));
      if (err.name === 'CastError') return next(new IncorrectDataException('Переданы некорректные данные для постановки/снятии лайка.'));

      return next(err);
    });
};

export const dislikeCard = (req: authRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  return card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .orFail(new Error('NoCardException'))
    .then((foundCard) => res.send({ data: foundCard }))
    .catch((err) => {
      if (err.message === 'NoCardException') return next(new ForbiddenException('Карточка с указанным _id не найдена.'));
      if (err.name === 'CastError') return next(new IncorrectDataException('Переданы некорректные данные для постановки/снятии лайка.'));

      return next(err);
    });
};
