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
