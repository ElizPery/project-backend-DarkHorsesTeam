import createHttpError from 'http-errors';
import {
  changeUserService,
  changeWaterRateService,
  getUserDataService,
  updateUserAvatarService,
} from '../services/user.js';

import { saveFileToCloudinary } from '../utils/cloudinary.js';
import { saveFileToUploadsDir } from '../utils/fileUpload.js';

export const getUserDataController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const data = await getUserDataService({ _id: userId });
  if (!data) {
    next(createHttpError(404, `User with id=${userId} not found`));
    return;
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found user with id=${userId}`,
    data,
  });
};

export const changeWaterRateController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { dailyNorma } = req.body;
  const result = await changeWaterRateService(
    { _id: userId },
    { $set: { dailyNorma } },
  );
  if (!result) {
    next(createHttpError(404, `User with id=${userId} not found`));
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully updated a water rate!',
    data: result,
  });
};

export const changeUserController = async (req, res, next) => {
  const result = await changeUserService(
    req.user._id,
    req.body,
  );

  if (!result) {
    throw createHttpError(404, 'Sorry, but we don`t have such a user!');
  }

  console.log(req.body);

  return res.json({
    status: 200,
    message: 'Successfully patched the user!',
    data: result.user,
  })
}


export const updateUserAvatarController = async (req, res, next) => {
  const userId = req.user._id;
  let avatarUrl = req.user.photo;

  if (req.body.photo) {
    avatarUrl = req.body.photo;
  }

  if (req.file) {
    if (avatarUrl) {
      const publicId = avatarUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    if (env('ENABLE_CLOUDINARY') === 'true') {
      avatarUrl = await saveFileToCloudinary(req.file);
    } else {
      avatarUrl = await saveFileToUploadsDir(req.file);
    }
  }

  const updatedUser = await updateUserAvatarService(userId, avatarUrl);

  if (!updatedUser) {
    return next(createHttpError(404, `User with id=${userId} not found`));
  }

  res.status(200).json({
    status: 200,
    data: updatedUser,
  });
};
