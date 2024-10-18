import createHttpError from 'http-errors';
import {
  changeUserService,
  changeWaterRateService,
  getUserDataService,
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

export const changeUserController = async (req, res, next) => {
  const { userId } = req.params;

  let photoUrl;

  if (req.file) {
    photoUrl = await saveFileToUploadDir(req.file);
  }

  const result = await changeUserService(
    userId,
    req.body,
    photoUrl,
  );

  if (!result) {
    throw createHttpError(404, 'Sorry, but we don`t have such a user!');
  }

  console.log(result);

  return res.json({
    status: 200,
    message: 'Successfully patched the user!',
    data: result.user,
  });
};
