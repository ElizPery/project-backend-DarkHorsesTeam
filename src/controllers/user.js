import createHttpError from 'http-errors';
import {
  changeWaterRateService,
  getUserDataService,
} from '../services/user.js';

export const getUserDataController = async (req, res, next) => {
  const { userId } = req.params;
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
  const { userId } = req.params;
  const result = await changeWaterRateService(
    { _id: userId },
    req.body.dailyNorma,
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
