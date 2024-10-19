import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UsersCollection } from './../db/models/User.js';
import createHttpError from 'http-errors';
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

export const changeUserService = async (userId, payload, options = {}) => {
  const { currentPwd, password, ...updateData } = payload;

  const user = await UsersCollection.findOne({ _id: userId });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (currentPwd) {
    const isPasswordCorrect = await bcrypt.compare(currentPwd, user.password);

    if (!isPasswordCorrect) {
      throw createHttpError(400, 'Current password is incorrect');
    }

    if (password) {
      const hashedNewPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedNewPassword;
    }
  }

  const rawResult = await UsersCollection.findOneAndUpdate(
    { _id: userId },
    updateData,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    user: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
}

export const updateUserAvatarService = async (userId, avatarUrl) => {
  return await UsersCollection.findByIdAndUpdate(
    userId,
    { photo: avatarUrl },
    { new: true },
  );
};
