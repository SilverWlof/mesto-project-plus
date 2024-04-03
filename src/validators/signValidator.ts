import { Joi, celebrate } from 'celebrate';

export const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
    about: Joi.string().min(2).max(200),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
