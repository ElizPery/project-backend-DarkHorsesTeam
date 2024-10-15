import Joi from 'joi';

export const waterRateSchema = Joi.object({
  dailyNorma: Joi.number().min(0).max(15000).required().messages({
    'number.base': 'Water norm must be a number',
    'number.min': 'Water norm must be greater than or equal to 0',
    'number.max': 'Water norm must be less than or equal to 15000',
  }),
});
