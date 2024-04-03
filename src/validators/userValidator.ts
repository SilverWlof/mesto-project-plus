import { Joi, celebrate } from 'celebrate';

export const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
    about: Joi.string().min(2).max(200),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
export const updateUserBioByIdValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }),
});
export const updateUserAvatarByIdValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri(),
  }),
});
export const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().max(24),
  }),
});
