import { Router } from 'express';
import ctrlWrapper from './../utils/ctrlWrapper.js';
import {
  changeWaterRateController,
  getUserDataController,
} from '../controllers/user.js';
import validateBody from './../utils/validateBody.js';
import { waterRateSchema } from '../validation/users.js';

const userRouter = Router();
userRouter.get('/:userId', ctrlWrapper(getUserDataController));
userRouter.patch(
  '/change-water-rate/:userId',
  validateBody(waterRateSchema),
  ctrlWrapper(changeWaterRateController),
);

export default userRouter;
