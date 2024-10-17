import { UsersCollection } from '../db/models/User.js';
import { WaterCollection } from '../db/models/Water.js';

export const addWater = async (userId, date, volume) => {
  const { dailyNorma } = await UsersCollection.findById(userId);
  const waterload = {
    userId,
    date,
    volume,
    dailyNorma,
  };
  await WaterCollection.create(waterload);
};
