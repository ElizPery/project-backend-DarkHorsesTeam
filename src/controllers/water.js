import { addWater, getWaterForMonth, deleteWater } from '../services/water.js';
import createHttpError from 'http-errors';

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

export async function getWaterForMonthController(req, res) {
  const { month } = req.body;
  const userId = req.user._id;
  const year = new Date().getFullYear();

  const data = await getWaterForMonth({ month, userId, year });

  res.status(200).json({
    status: 200,
    message: 'Successfully',
    data,
  });
}

export const deleteWaterController = async (req, res) => {
  const { id } = req.params;
  const { _id: _userId } = req.user;
  const data = await deleteWater({
    _id: id,
    userId: _userId,
  });
  console.log('d', data);
  if (!data) {
    console.log('d1', data);
    throw createHttpError(404, 'Water not found');
  }

  res.status(204).send();
};
