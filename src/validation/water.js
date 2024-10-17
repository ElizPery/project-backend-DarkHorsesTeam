import Joi from 'joi';

export const waterPostShema = Joi.object({
  date: Joi.string().required(),
  volume: Joi.number().min(1).max(5000).required(),
  dailyNorma: Joi.number().required(),
});
