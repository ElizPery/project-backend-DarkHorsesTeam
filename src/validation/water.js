import Joi from 'joi';

export const updateWaterSchema = Joi.object({
  volume: Joi.number().required(),
  date: Joi.string().required(),
});

export const waterPostShema = Joi.object({
  date: Joi.string().required(),
  volume: Joi.number().min(1).max(5000).required(),
  dailyNorma: Joi.number().required(),
});

export const waterForMonthSchema = Joi.object({
  month: Joi.number().min(1).max(12).required().messages({
    'number.base': 'month should be number',
    'number.min': 'month should be greater than or equal to 1',
    'number.max': 'month should be less than or equal to 12',
    'any.required': 'Month is required',
  }),
});
