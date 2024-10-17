import createHttpError from 'http-errors';
import { updateWaterService } from '../services/water.js';

export const updateWaterController = async (req, res) => {
  const { id } = req.params;
  const { volume, date } = req.body;

  const data = await updateWaterService(id, { volume, date });

  if (!data) {
    throw createHttpError(404, 'Water record not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully update water record',
    data,
  });
};
