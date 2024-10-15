import mongoose from 'mongoose';
import { UsersCollection } from './../db/models/User.js';
export const changeWaterRateService = async (id, dailyNorma, options = {}) => {
  let rawResult = null;
  const user = await UsersCollection.findOne({ _id: id });
  if (user) {
    rawResult = await UsersCollection.findOneAndUpdate(
      { _id: id },
      { $set: { dailyNorma } },
      {
        new: true,
        includeResultMetadata: true,
        ...options,
      },
    );
  }
  if (!rawResult || !rawResult.value.dailyNorma) return null;
  return {
    dailyNorma: rawResult.value.dailyNorma,
  };
};
