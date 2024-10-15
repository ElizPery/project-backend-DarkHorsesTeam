import mongoose from 'mongoose';
import { UsersCollection } from './../db/models/User.js';
export const changeWaterRateService = async (id, dailyNorma, options = {}) => {
  let rawResult = null;
  const contact = await UsersCollection.findOne({ _id: id });
  if (contact) {
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
