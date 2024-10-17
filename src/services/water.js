import { WaterCollection } from '../models/water.js';
export const updateWaterService = async (id, data) => {
  const rawResult = await WaterCollection.findOneAndUpdate({ _id: id }, data);

  if (!rawResult || !rawResult.value) return null;

  return rawResult.value;
};
