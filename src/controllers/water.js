import createHttpError from 'http-errors';
import {
  addWater,
  getWaterForMonth,
  deleteWater,
  getTodayWater,
  addWater,
  getWaterForMonth,
  updateWaterService,
} from '../services/water.js';

export const getTodayWaterController = async (req, res) => {
  const userId = req.user._id;
  const dailyNorma = req.user.dailyNorma;

  const data = await getTodayWater({ userId, dailyNorma });
  res.json({
    status: 200,
    message: "Successfully found today's water data",
    data,
  });
};

export const updateWaterController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { volume, date } = req.body;

  const data = await updateWaterService({ _id: id, userId }, { volume, date });

  if (!data) {
    throw createHttpError(404, 'Water record not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully update water record',
    data,
  });
};

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
  const { _id: userId } = req.user;
  const data = await deleteWater({
    _id: id,
    userId: userId,
  });

  if (!data) {
    throw createHttpError(404, 'Water not found');
  }

  res.status(204).send();
};
