
import mongoose from 'mongoose';
import { UsersCollection } from './../db/models/User.js';
export const getUserDataService = async (id) =>
  UsersCollection.findOne(id).select('-password');

export const changeWaterRateService = async (id, dailyNorma, options = {}) => {
  let rawResult = null;
  const user = await UsersCollection.findOne(id);
  if (user) {
    rawResult = await UsersCollection.findOneAndUpdate(id, dailyNorma, {
      includeResultMetadata: true,
      ...options,
    });
  }
  if (!rawResult || !rawResult.value.dailyNorma) return null;
  return {
    dailyNorma: rawResult.value.dailyNorma,
  };
};
