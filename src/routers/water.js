import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from './../utils/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import isValidId from '../middlewares/isValidId.js';
import {
  waterPostShema,
  waterForMonthSchema,
  updateWaterSchema,
} from '../validation/water.js';
import {
  addWaterController,
  getWaterForMonthController,
  deleteWaterController,
  getTodayWaterController,
  updateWaterController,
} from '../controllers/water.js';

const waterRouter = Router();

waterRouter.use(authenticate);

waterRouter.get('/today', ctrlWrapper(getTodayWaterController));

waterRouter.patch(
  '/:id',
  isValidId,
  validateBody(updateWaterSchema),
  ctrlWrapper(updateWaterController.updateWater),
);

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

waterRouter.delete('/:id', isValidId, ctrlWrapper(deleteWaterController));

export default waterRouter;
