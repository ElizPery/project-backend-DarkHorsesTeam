import createHttpError from 'http-errors';
import {
  changeWaterRateService,
  getUserDataService,
  updateUserAvatarController,
} from '../services/user.js';

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

export const updateUserAvatarController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    let avatarUrl = req.user.photo || null;

    if (req.file) {
      if (avatarUrl) {
        const publicId = avatarUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }

      const result = await cloudinary.uploader.upload(req.file.path);
      avatarUrl = result.secure_url;
    }

    const updatedUser = await updateUserAvatarService(userId, avatarUrl);

    if (!updatedUser) {
      next(createHttpError(404, `User with id=${userId} not found`));
      return;
    }

    res.status(200).json({
      status: 'success',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
