import { addWater } from '../services/water.js';

export const addWaterController = async (req, res) => {
  const { _id: userId } = req.user;
  const { date, volume, dailyNorma } = req.body;
  const data = await addWater(userId, date, volume, dailyNorma);

  res.status(201).json({
    status: 201,
    message: 'Successfully added water!',
    data,
  });
};

export const deleteWaterController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await waterServices.deleteWater({ _id: id, userId });

  if (!data) {
    throw createHttpError(404, 'Water not found');
  }

  res.status(204).send();
};
