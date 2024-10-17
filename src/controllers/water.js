import createHttpError from 'http-errors';

import * as waterServices from '../services/water.js';

export const addWaterController = async (req, res) => {
  const { _id: userId } = req.user;
  const { date, volume } = req.body;
  const data = await waterServices.addWater(userId, date, volume);

  res.status(201).json({
    status: 201,
    message: 'Successfully added water!',
    data,
  });
};
