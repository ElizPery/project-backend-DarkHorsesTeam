
import { getTodayWater } from "../services/water.js";
import { addWater, getWaterForMonth } from '../services/water.js';

export const getTodayWaterController = async (req, res) => {
    const userId = req.user._id;
    const dailyNorma = req.user.dailyNorma;
    
    const data = await getTodayWater({userId, dailyNorma});
     res.json({
            status: 200,
            message: "Successfully found today's water data",
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

