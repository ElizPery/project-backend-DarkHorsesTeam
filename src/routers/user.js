import { Router } from 'express';
import ctrlWrapper from './../utils/ctrlWrapper.js';
import {
  changeWaterRateController,
  getUserDataController,
} from '../controllers/user.js';
import validateBody from './../utils/validateBody.js';
import { waterRateSchema } from '../validation/users.js';
import { authenticate } from '../middlewares/authenticate.js';

const userRouter = Router();
userRouter.use(authenticate);
userRouter.get('/', ctrlWrapper(getUserDataController));
userRouter.patch(
  '/change-water-rate',
  validateBody(waterRateSchema),
  ctrlWrapper(changeWaterRateController),
);
export default userRouter;
