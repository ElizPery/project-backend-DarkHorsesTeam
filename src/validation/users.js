import Joi from 'joi';

import { emailRegexp } from '../constants/users.js';

export const userRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});
export const waterRateSchema = Joi.object({
  dailyNorma: Joi.number().min(0).max(15000).required().messages({
    'number.base': 'Water norm must be a number',
    'number.min': 'Water norm must be greater than or equal to 0',
    'number.max': 'Water norm must be less than or equal to 15000',
  }),
});
export const userLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).max(64).required(),
});
