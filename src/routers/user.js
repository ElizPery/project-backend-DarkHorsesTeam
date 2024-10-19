import { Router } from 'express';
import ctrlWrapper from './../utils/ctrlWrapper.js';
import {
  changeUserController,
  changeWaterRateController,
  getUserDataController,
} from '../controllers/user.js';
import validateBody from './../utils/validateBody.js';
import { waterRateSchema, updatePhotoUserSchema } from '../validation/users.js';
import { authenticate } from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';

const userRouter = Router();
userRouter.use(authenticate);
userRouter.get('/', ctrlWrapper(getUserDataController));
userRouter.patch(
  '/change-water-rate',
  validateBody(waterRateSchema),
  ctrlWrapper(changeWaterRateController),
);

userRouter.patch(
  '/update-info',
  validateBody(userUpdateSchema),
  ctrlWrapper(changeUserController),
);

userRouter.patch(
  '/change-photo',
  upload.single('photo'),
  validateBody(updatePhotoUserSchema),
  ctrlWrapper(updateUserAvatarController),
);
export default userRouter;
