import Joi from 'joi';

export const updateWaterSchema = Joi.object({
  volume: Joi.number().required(),
  date: Joi.string().required(),
});
