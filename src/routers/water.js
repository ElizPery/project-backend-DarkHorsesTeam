import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';

import { updateWaterController } from '../controllers/water.js';
import { updateWaterSchema } from '../validation/water.js';
import isValidId from '../middlewares/isValidId.js';
import { waterPostShema, waterForMonthSchema } from '../validation/water.js';
import ctrlWrapper from './../utils/ctrlWrapper.js';
import validateBody from './../utils/validateBody.js';

import {
  addWaterController,
  getWaterForMonthController,
  deleteWaterController,
} from '../controllers/water.js';
const waterRouter = Router();

waterRouter.use(authenticate);

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

waterRouter.delete('/:id', ctrlWrapper(deleteWaterController));

export default waterRouter;
