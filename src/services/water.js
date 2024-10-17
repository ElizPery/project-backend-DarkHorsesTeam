import { WaterCollection } from '../db/models/Water.js';

export const addWater = async (userId, date, volume, dailyNorma) => {
  const waterload = {
    userId,
    date,
    volume,
    dailyNorma,
  };
  return await WaterCollection.create(waterload);
};

export const deleteWater = async (filter) => {
  console.log(filter);
  await WaterCollection.findOneAndDelete(filter);
};
