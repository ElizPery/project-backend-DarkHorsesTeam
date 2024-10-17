import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { waterPostShema, waterForMonthSchema } from '../validation/water.js';
import ctrlWrapper from './../utils/ctrlWrapper.js';
import validateBody from './../utils/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import {
  addWaterController,
  getWaterForMonthController,
} from '../controllers/water.js';
const waterRouter = Router();

waterRouter.use(authenticate);

waterRouter.post(
  '/',
  validateBody(waterPostShema),
  ctrlWrapper(addWaterController),
);

waterRouter.post(
  '/month',
  validateBody(waterForMonthSchema),
  ctrlWrapper(getWaterForMonthController),
);

export default waterRouter;
