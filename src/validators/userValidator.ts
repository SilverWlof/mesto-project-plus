import { Joi, celebrate } from 'celebrate';
//import validator from 'validator';

export const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/),
    about: Joi.string().min(2).max(200),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
export const updateUserBioByIdValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),
});
export const updateUserAvatarByIdValidator = celebrate({
  body: Joi.object().keys({
    // avatar: (v: string) => validator.isURL(v),
    avatar: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/),
  }),
});
export const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().pattern(/([A-Fa-f0-9])/).max(24),
  }),
});
