import Joi from 'joi';

export const waterPostShema = Joi.object({
  date: Joi.date()
    .required()
    .max('now')
    .min(new Date().setUTCHours(0, 0, 0, 0)),
  volume: Joi.number().min(1).max(5000).required(),
});
