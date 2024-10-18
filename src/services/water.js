import { WaterCollection } from '../db/models/Water.js';
import createHttpError from 'http-errors';

export const updateWaterService = async (id, data) => {
  const rawResult = await WaterCollection.findOneAndUpdate({ _id: id }, data);

  if (!rawResult || !rawResult.value) return null;

  return rawResult.value;
};

export const addWater = async (userId, date, volume, dailyNorma) => {
  const waterload = {
    userId,
    date,
    volume,
    dailyNorma,
  };
  return await WaterCollection.create(waterload);
};

export async function getWaterForMonth({ year, userId, month }) {
  if (!month) {
    throw createHttpError(400, 'Month is required');
  }

  const waterRecords = await WaterCollection.find({
    userId: userId,
    date: {
      $gte: `${year}-${month}-01T00:00:00`,
      $lte: `${year}-${month}-31T23:59:00`,
    },
  });
  const dailyRecords = {};

  waterRecords.forEach((record) => {
    const date = record.date.split('T')[0];

    if (!dailyRecords[date]) {
      dailyRecords[date] = {
        totalVolume: 0,
        dailyNorma: record.dailyNorma,
        consumptionCount: 0,
      };
    }
    dailyRecords[date].totalVolume += record.volume;
    dailyRecords[date].consumptionCount += 1;
  });
  console.log(dailyRecords);

  const result = Object.keys(dailyRecords).map((date) => {
    const record = dailyRecords[date];
    const percentage = (record.totalVolume / record.dailyNorma) * 100;

    return {
      date: date,
      dailyNorma: record.dailyNorma,
      consumptionCount: record.consumptionCount,
      percentage: `${percentage}%`,
    };
  });

  return result;
}

export const deleteWater = async (filter) => {
  return await WaterCollection.findOneAndDelete(filter);
};
