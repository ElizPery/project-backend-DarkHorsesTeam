import createHttpError from 'http-errors';
import { changeWaterRateService } from '../services/user.js';

export const changeWaterRateController = async (req, res, next) => {
  const { userId } = req.params;
  const result = await changeWaterRateService(userId, req.body.dailyNorma);
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
