import { Joi, celebrate } from 'celebrate';

const simpleCardOperation = {
  cardId: Joi.string().required().max(24),
};

export const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // link: Joi.string().required().regex(),
    link: Joi.string().required().uri(),
  }),
});
export const deleteCardByIdValidator = celebrate({
  params: Joi.object().keys(simpleCardOperation),
});
export const likeCardValidator = celebrate({
  params: Joi.object().keys(simpleCardOperation),
});
export const dislikeCardValidator = celebrate({
  params: Joi.object().keys(simpleCardOperation),
});
