
import { WaterCollection } from '../db/models/Water.js';
import createHttpError from 'http-errors';

const addZero = (value) => {
    const string = value.toString();
    if (string.length < 2) {
        return `0${value}`;
    }
    return value;
};

export const getTodayWater = async ({ userId, dailyNorma }) => {

    const year = new Date().getFullYear();
    const month = addZero(new Date().getMonth() + 1);
    const day = addZero(new Date().getDate());

    const waterQuery = await WaterCollection.find({
        userId: userId,
        date: { $gte: `${year}-${month}-${day}T00:00:00` }
    });

    if (waterQuery.length === 0) {
        return {
            data: [],
            totalWaterPercent: "0%"
        };
    };

    let waterForDay;
    waterQuery.forEach((element) => {
        waterForDay += element.volume;
    });

    const percent = Math.ceil((waterForDay / dailyNorma) * 100);

    return {
        data: waterQuery,
        totalWaterPercent:`${percent}%`
    };
};


export const updateWaterService = async (filter, data, options = {}) => {
  const rawResult = await WaterCollection.findOneAndUpdate(filter, data, {
    includeResultMetadata: true,
    ...options,
  });

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

