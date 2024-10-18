import { Router } from 'express';
import ctrlWrapper from './../utils/ctrlWrapper.js';
import {
  changeUserController,
  changeWaterRateController,
  getUserDataController,
} from '../controllers/user.js';
import validateBody from './../utils/validateBody.js';
import { userUpdateSchema, waterRateSchema } from '../validation/users.js';
import { authenticate } from '../middlewares/authenticate.js';
import isValidId from '../middlewares/isValidId.js';

const userRouter = Router();
userRouter.use(authenticate);
userRouter.get('/', ctrlWrapper(getUserDataController));
userRouter.patch(
  '/change-water-rate',
  validateBody(waterRateSchema),
  ctrlWrapper(changeWaterRateController),
);

userRouter.patch(
  '/update-info/:userId',
  // upload.single('photo'),
  validateBody(userUpdateSchema),
  ctrlWrapper(changeUserController),
);


export default userRouter;
